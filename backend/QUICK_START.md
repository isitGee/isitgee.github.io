# 🚀 Quick Start Guide - Contact Backend

Get your portfolio collecting messages in 3 minutes!

## Step 1: Install & Setup

```bash
cd backend
npm install
bash setup.sh
```

This will automatically:
- ✓ Install all dependencies
- ✓ Generate a secure admin token
- ✓ Create the initial configuration

## Step 2: Note Your Admin Token

The setup script will output your token. **Save it somewhere safe!**

Example output:
```
✅ Setup complete!

📋 Your Admin Token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

📝 Next steps:
  1. Edit backend/data/admin-config.json and update 'adminEmail'
  2. Run: npm start
  3. Visit: http://localhost:3000/admin
  4. Login with your token
```

## Step 3: Update Email (Optional)

Edit `backend/data/admin-config.json`:

```json
{
  "adminToken": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "adminEmail": "your-real-email@example.com"
}
```

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
✓ Portfolio contact backend running on http://localhost:3000
✓ Admin dashboard: http://localhost:3000/admin
✓ API docs: POST /api/contact, GET /api/messages, etc.
```

## Step 5: Access Admin Dashboard

1. Open your browser: `http://localhost:3000/admin`
2. Paste your admin token
3. Click **Login**
4. You're in! 🎉

## Step 6: Test the Contact Form

On your portfolio website:

1. Scroll to the Contact section
2. Fill out the form
3. Click "Send Message"
4. Check the admin dashboard — your message should appear!

---

## That's It!

Your backend is now collecting messages. Here's what you can do:

✅ View all messages in the admin dashboard  
✅ Mark messages as read/unread  
✅ Archive messages  
✅ Delete messages  
✅ Reply to messages (opens your email client)  
✅ See statistics (total, unread, archived)  

---

## For Production Deployment

When you're ready to deploy to production (after testing locally):

### Option 1: Deploy to Heroku (Free tier available)

```bash
heroku create your-app-name
heroku config:set ADMIN_TOKEN="your-secure-token" -a your-app-name
git push heroku main
# Visit: https://your-app-name.herokuapp.com/admin
```

### Option 2: Deploy to Railway

1. Push code to GitHub
2. Connect to Railway.app
3. Set env variables in dashboard
4. Deploy!

### Option 3: Self-hosted (VPS/DigitalOcean)

Use PM2 to keep the server running:

```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

---

## Need Help?

- **Dashboard won't load?** Make sure backend is running (`npm start`)
- **Form not sending?** Check browser console (F12) for errors
- **Forgot admin token?** Check `backend/data/admin-config.json`

See `README.md` for detailed documentation.

---

**You're all set!** 🎊
