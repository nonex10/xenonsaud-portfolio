# Contact form setup (simple steps)

How it works: visitor fills the form on Vercel -> React sends it to your Flask
backend on Render -> Flask emails it to you through Gmail. Your Gmail password
lives only on Render, never in your code or GitHub.

## What was added / changed
- NEW `backend/` folder: `app.py`, `requirements.txt`, `.env.example`, `.gitignore`, `test_app.py`
- CHANGED `src/pages/Contact.jsx`: only the submit logic, the button text/disabled
  state, and one feedback line. The layout and styling are untouched.
- NEW `.env.example` in the project root (shows the VITE_API_URL name).

## Step 1 - Make a Gmail App Password
1. Open https://myaccount.google.com/security and turn ON 2-Step Verification.
2. Open https://myaccount.google.com/apppasswords
3. Create an app password (name it "Portfolio"). Copy the 16 characters.
   (This is NOT your normal Gmail password.)

## Step 2 - Test the backend on your computer (optional but recommended)
In a terminal:
```
cd backend
python -m venv venv
venv\Scripts\activate          (Windows)   |   source venv/bin/activate   (Mac/Linux)
pip install -r requirements.txt
copy .env.example .env         (Windows)   |   cp .env.example .env       (Mac/Linux)
```
Open `backend/.env` and fill in the 4 values. For local testing set
`FRONTEND_URL=http://localhost:5173`. Then:
```
python app.py
```
In a second terminal, in the project root:
```
copy .env.example .env.local
npm run dev
```
Open http://localhost:5173/contact, send a test message, and check your inbox.
To run the automatic checks (no real email is sent): `python test_app.py`

## Step 3 - Push to GitHub
Make sure `.env` is NOT uploaded (the `.gitignore` files already block it).
Commit and push the `backend/` folder with the rest of the project.

## Step 4 - Deploy the backend on Render
1. Go to https://render.com -> New -> Web Service -> connect your GitHub repo.
2. Settings:
   - Root Directory: `backend`
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app --workers 1`
3. Under Environment Variables add these 4:
   - `SMTP_EMAIL` = the Gmail address that sends (can be your own)
   - `SMTP_APP_PASSWORD` = the 16-character app password
   - `CONTACT_RECEIVER_EMAIL` = the inbox where you want messages
   - `FRONTEND_URL` = your Vercel address, e.g. `https://yourname.vercel.app`
     (no slash at the end; use commas for more than one address)
4. Deploy. Render gives you an address like `https://your-api.onrender.com`.
   Open `https://your-api.onrender.com/api/health` - you should see `{"status":"ok"}`.

Note: on Render's free plan the server sleeps when idle, so the first message
after a quiet period can take 30-60 seconds. The form shows "Sending..." meanwhile.

## Step 5 - Connect Vercel to Render
1. Vercel -> your project -> Settings -> Environment Variables.
2. Add `VITE_API_URL` = `https://your-api.onrender.com` (no slash at the end).
3. Redeploy the frontend (Deployments -> Redeploy). Vite only reads this
   variable when it builds, so a redeploy is required.

## Step 6 - Final check
Send a real message from your live site. You should get an email with the name,
email and message, and pressing Reply should write to the visitor.

## If something fails
- "Couldn't reach the server": VITE_API_URL is wrong, or you didn't redeploy Vercel.
- Browser console says CORS error: FRONTEND_URL on Render doesn't exactly match
  your Vercel address.
- "message couldn't be sent": check Render -> Logs. Usually a wrong app password,
  or 2-Step Verification is off.
- "Too many messages": the limit is 5 per hour (20 per day) per visitor.
