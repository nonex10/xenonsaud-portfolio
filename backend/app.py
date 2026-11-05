import os
import re
import smtplib
from email.message import EmailMessage

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.middleware.proxy_fix import ProxyFix

load_dotenv()

app = Flask(__name__)
# Render sits behind a proxy; this makes rate limiting see the visitor's real IP.
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1)
app.config["MAX_CONTENT_LENGTH"] = 20 * 1024  # reject huge requests

# Only your own portfolio may call this API from a browser.
# FRONTEND_URL can hold several addresses separated by commas.
allowed_origins = [
    o.strip().rstrip("/")
    for o in os.environ.get("FRONTEND_URL", "").split(",")
    if o.strip()
]
CORS(app, resources={r"/api/*": {"origins": allowed_origins}}, methods=["POST", "GET"])

limiter = Limiter(
    get_remote_address,
    app=app,
    storage_uri="memory://",
    default_limits=[],
)

EMAIL_RE = re.compile(r"^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$")

NAME_MAX, EMAIL_MAX, MESSAGE_MAX = 100, 254, 5000


def validate(data):
    """Return (clean_values, errors). Errors is a dict of field -> message."""
    errors = {}
    if not isinstance(data, dict):
        return None, {"form": "Invalid request."}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name:
        errors["name"] = "Please enter your name."
    elif len(name) > NAME_MAX or "\r" in name or "\n" in name:
        errors["name"] = "Please enter a valid name (max 100 characters)."

    if not email:
        errors["email"] = "Please enter your email."
    elif len(email) > EMAIL_MAX or not EMAIL_RE.match(email):
        errors["email"] = "Please enter a valid email address."

    if not message:
        errors["message"] = "Please write a message."
    elif len(message) > MESSAGE_MAX:
        errors["message"] = "Your message is too long (max 5000 characters)."

    return {"name": name, "email": email, "message": message}, errors


def send_email(name, email, message):
    """Send the visitor's message to the site owner using SMTP (Gmail by default)."""
    sender = os.environ["SMTP_EMAIL"]
    password = os.environ["SMTP_APP_PASSWORD"]
    receiver = os.environ["CONTACT_RECEIVER_EMAIL"]
    host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    port = int(os.environ.get("SMTP_PORT", "465"))

    msg = EmailMessage()
    msg["Subject"] = f"Portfolio message from {name}"
    msg["From"] = sender          # always your own address, never the visitor's
    msg["To"] = receiver
    msg["Reply-To"] = email       # pressing Reply goes to the visitor
    msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}\n")

    with smtplib.SMTP_SSL(host, port, timeout=15) as server:
        server.login(sender, password)
        server.send_message(msg)


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/api/contact")
# Mistyped forms (400) don't use up the allowance; real send attempts do.
@limiter.limit("5 per hour;20 per day", deduct_when=lambda resp: resp.status_code != 400)
def contact():
    data = request.get_json(silent=True)
    clean, errors = validate(data)
    if errors:
        return jsonify({"success": False, "errors": errors,
                        "message": "Please check the form and try again."}), 400

    required = ["SMTP_EMAIL", "SMTP_APP_PASSWORD", "CONTACT_RECEIVER_EMAIL"]
    if any(not os.environ.get(k) for k in required):
        app.logger.error("Email settings are missing on the server.")
        return jsonify({"success": False,
                        "message": "The contact service isn't set up yet. Please try again later."}), 503

    try:
        send_email(clean["name"], clean["email"], clean["message"])
    except smtplib.SMTPAuthenticationError:
        app.logger.error(
            "Gmail rejected the login. Check SMTP_EMAIL and SMTP_APP_PASSWORD in .env "
            "(the app password must be the 16-letter code from Google, not your normal password)."
        )
        return jsonify({"success": False,
                        "message": "Sorry, your message couldn't be sent. Please try again in a moment."}), 500
    except Exception:
        # Details go to the server log only, never to the visitor.
        app.logger.exception("Failed to send contact email")
        return jsonify({"success": False,
                        "message": "Sorry, your message couldn't be sent. Please try again in a moment."}), 500

    return jsonify({"success": True, "message": "Thanks! Your message has been sent."}), 200


@app.errorhandler(429)
def too_many(_e):
    return jsonify({"success": False,
                    "message": "Too many messages sent. Please try again later."}), 429


@app.errorhandler(413)
def too_large(_e):
    return jsonify({"success": False, "message": "Your message is too large."}), 413


@app.errorhandler(404)
def not_found(_e):
    return jsonify({"success": False, "message": "Not found."}), 404


@app.errorhandler(405)
def bad_method(_e):
    return jsonify({"success": False, "message": "Method not allowed."}), 405


def startup_check():
    """Print simple warnings so setup mistakes are easy to spot. Secrets are never printed."""
    for key in ("SMTP_EMAIL", "SMTP_APP_PASSWORD", "CONTACT_RECEIVER_EMAIL", "FRONTEND_URL"):
        if not os.environ.get(key):
            print(f"[setup] WARNING: {key} is missing. Add it to backend/.env and restart.")
    pw = os.environ.get("SMTP_APP_PASSWORD", "")
    if pw and len(pw.replace(" ", "")) != 16:
        print("[setup] WARNING: SMTP_APP_PASSWORD is not 16 characters. "
              "Gmail app passwords are exactly 16 letters; sending will fail until it is fixed.")
    print(f"[setup] Allowed website address(es): {allowed_origins or 'NONE (set FRONTEND_URL)'}")


if __name__ == "__main__":
    startup_check()
    app.run(port=5000, debug=False)
