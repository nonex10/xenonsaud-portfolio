"""Run with:  python test_app.py   (uses a fake SMTP server, sends no real email)"""
import os
os.environ.update(SMTP_EMAIL="me@gmail.com", SMTP_APP_PASSWORD="x",
                  CONTACT_RECEIVER_EMAIL="inbox@gmail.com",
                  FRONTEND_URL="https://my-portfolio.vercel.app")
import smtplib
import app as appmod

sent = []
class FakeSMTP:
    def __init__(self, *a, **k): pass
    def __enter__(self): return self
    def __exit__(self, *a): return False
    def login(self, u, p): sent.append(("login", u))
    def send_message(self, m): sent.append(("msg", m))
smtplib.SMTP_SSL = FakeSMTP

c = appmod.app.test_client()
H = {"Origin": "https://my-portfolio.vercel.app"}
ok = {"name": "Sam", "email": "sam@example.com", "message": "Hello there"}
def post(d, h=H): return c.post("/api/contact", json=d, headers=h)

def check(label, cond):
    print(("PASS " if cond else "FAIL ") + label); assert cond

r = post({"name": "  ", "email": "", "message": ""})
check("empty form -> 400 with 3 field errors", r.status_code == 400 and len(r.json["errors"]) == 3)
r = post({**ok, "email": "not-an-email"})
check("invalid email -> 400", r.status_code == 400 and "email" in r.json["errors"])
r = post({**ok, "name": "Sam\nBcc: evil@x.com"})
check("header injection in name -> 400", r.status_code == 400)
r = post({**ok, "message": "x" * 5001})
check("too-long message -> 400", r.status_code == 400)
r = c.post("/api/contact", data="garbage", headers=H)
check("non-JSON body -> 400", r.status_code == 400)

r = post(ok)
check("valid submit -> 200", r.status_code == 200 and r.json["success"])
m = [x[1] for x in sent if x[0] == "msg"][0]
check("From is the owner's address, not visitor", m["From"] == "me@gmail.com")
check("To is receiver", m["To"] == "inbox@gmail.com")
check("Reply-To is visitor", m["Reply-To"] == "sam@example.com")
body = m.get_content()
check("email contains name, email, message", all(t in body for t in ["Sam", "sam@example.com", "Hello there"]))
check("CORS allows own site", r.headers.get("Access-Control-Allow-Origin") == H["Origin"])
r2 = post(ok, {"Origin": "https://evil.example.com"})
check("CORS does not allow other sites", "Access-Control-Allow-Origin" not in r2.headers)

def boom(*a, **k): raise RuntimeError("secret smtp detail")
appmod.send_email = boom
r = post(ok)
check("SMTP failure -> 500 with generic message", r.status_code == 500 and "secret" not in r.get_data(as_text=True))

# rate limit: 5 real send attempts per hour (1 valid + 1 failed send already used)
codes = [post(ok).status_code for _ in range(5)]
check("rate limit kicks in -> 429", 429 in codes)
print("\nAll tests passed.")
