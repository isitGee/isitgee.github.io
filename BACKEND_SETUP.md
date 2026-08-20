# ✅ Backend Setup Complete!

Your portfolio website now has a complete contact message collection system. Here's what's been set up for you:

## 📦 What's Been Created

### Backend Server (`backend/server.js`)
- Express.js REST API
- 5 API endpoints for contact collection and management
- Token-based admin authentication
- JSON file-based message storage (no database needed)
- CORS enabled for cross-domain requests

### Admin Dashboard (`backend/public/admin.html`)
- Beautiful, modern web interface
- View all contact messages
- Filter by: Active, Unread, Archived, All
- Mark messages as read/unread
- Archive messages for organization
- Delete messages
- Quick reply via email
- Real-time statistics (total, unread, archived)

### Frontend Integration (`script.js`)
- Contact form now connects to backend API
- Automatic error handling and validation
- User-friendly success/error messages
- Works on both localhost and production

### Documentation (Complete!)
- **BACKEND_SETUP.md** (in root) — Overview and getting started
- **backend/README.md** — Full API documentation
- **backend/QUICK_START.md** — 3-minute setup guide
- **backend/DEPLOYMENT.md** — Production deployment guides

### Configuration & Scripts
- **package.json** — Node.js dependencies
- **setup.sh** — Automated setup script
- **.env.example** — Environment variables template
- **.gitignore** — Git ignore rules
- **data/admin-config.json** — Admin token storage
- **data/messages.json** — Message storage (auto-created)

---

## 🚀 Quick Start (Copy & Paste)

```bash
# 1. Go to backend directory
cd backend

# 2. Install dependencies (one-time)
npm install

# 3. Run automated setup (generates admin token)
bash setup.sh

# 4. Start the server
npm start

# 5. Open admin dashboard in browser
# http://localhost:3000/admin
# (Login with admin token from step 3)
```

---

## 📋 File Locations

```
backend/
├── server.js                 # Express server (handles API requests)
├── package.json              # Node.js dependencies
├── .gitignore               # Files to ignore in git
├── .env.example             # Environment variables template
├── setup.sh                 # Automated setup script
│
├── README.md                # Full technical documentation
├── QUICK_START.md           # 3-minute setup guide
├── DEPLOYMENT.md            # Production deployment guide
│
├── public/
│   └── admin.html           # Admin dashboard (web interface)
│
└── data/
    ├── admin-config.json    # Your admin token (KEEP SECURE!)
    ├── messages.json        # Stored messages (auto-created)
```

## 🚀 Get Started (3 Steps)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Generate Admin Token
```bash
bash setup.sh
```

This script will:
- Check if Node.js is installed ✓
- Install dependencies ✓
- Generate a secure admin token ✓
- Create initial configuration ✓

### Step 3: Start the Server
```bash
npm start
```

You'll see:
```
✓ Portfolio contact backend running on http://localhost:3000
✓ Admin dashboard: http://localhost:3000/admin
```

**That's it!** Your backend is now running. 🎉

---

## 📝 Using the Admin Dashboard

### Access the Dashboard

1. Open browser: `http://localhost:3000/admin`
2. Paste your admin token (from `backend/data/admin-config.json`)
3. Click **Login**

### Manage Messages

**Tabs:**
- **Active** — All non-archived messages
- **Unread** — New messages needing attention
- **Archived** — Hidden messages
- **All** — Every message ever sent

**For Each Message:**
- ✓ **Mark as Read** — Remove from unread list
- 📦 **Archive** — Hide but keep (useful for organization)
- 🗑️ **Delete** — Permanently remove
- ✉️ **Reply** — Opens your email with sender pre-filled

**Dashboard Stats:**
- **Total** — All messages received
- **Unread** — Messages requiring attention
- **Archived** — Hidden messages

---

## 🔌 How It Works (Technical)

### 1. **Frontend Form Submission**
When someone fills out your contact form on the website:
```javascript
// script.js automatically sends:
fetch("/api/contact", {
  method: "POST",
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    subject: "Hello",
    message: "Your message here..."
  })
})
```

### 2. **Backend Receives & Stores**
The server validates the data and stores it:
```
POST /api/contact
↓
Validate (email, name, etc.)
↓
Save to messages.json
↓
Send success response
```

### 3. **Admin Retrieves Messages**
When you login to the dashboard:
```
GET /api/messages?token=YOUR_TOKEN
↓
Verify token is correct
↓
Load all messages from messages.json
↓
Display in admin dashboard
```

### 4. **Admin Updates Messages**
When you mark as read, archive, or delete:
```
PATCH /api/messages/ID
↓
Update the message status
↓
Save to messages.json
↓
Refresh dashboard
```

---

## 🔐 Security

### Admin Token

Your admin token controls access to all messages. **Keep it safe!**

**Current token location:** `backend/data/admin-config.json`

**Generate a new token anytime:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Deployment Security

**Before going live:**
1. ✅ Change the default token (already done by setup.sh)
2. ✅ Keep token in environment variables, not in code
3. ✅ Use HTTPS (automatic on Heroku, Railway, etc.)
4. ✅ Regularly update Node.js and dependencies

---

## 🌐 Local Testing

Test everything before deploying:

### 1. Test the API with cURL
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "subject":"Test",
    "message":"This is a test"
  }'
```

### 2. Test the Admin Dashboard
1. Visit: `http://localhost:3000/admin`
2. Login with your token
3. You should see the test message above

### 3. Test the Portfolio Form
1. Go to your portfolio website (running locally)
2. Scroll to Contact section
3. Fill out and submit the form
4. Check admin dashboard — message should appear!

---

## 📤 Deployment (Production)

When ready to deploy (after testing locally):

### Quick Deploy to Heroku (Recommended for Beginners)
```bash
heroku create your-app-name
heroku config:set ADMIN_TOKEN="your-token-here"
git push heroku main
# Visit: https://your-app-name.herokuapp.com/admin
```

### Other Options
- **Railway.app** — Modern, easy, recommended
- **DigitalOcean App Platform** — Scalable, reliable
- **Self-hosted VPS** — Full control, more complex

**See `DEPLOYMENT.md` for detailed production guides.**

---

## 🛠️ Customization Ideas

### 1. Add Email Notifications
Automatically email you when a new message arrives:

```javascript
// Add to server.js
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({...});

transporter.sendMail({
  to: config.adminEmail,
  subject: `New message: ${subject}`,
  html: `<p>From: ${name}</p><p>${message}</p>`
});
```

### 2. Add Custom Fields
Add more fields to your contact form:

1. Update HTML form in `index.html` (add new input)
2. Update `script.js` to include in fetch body
3. Update `server.js` validation

### 3. Add Message Search
Search messages by sender name or subject in admin dashboard.

### 4. Add Rate Limiting
Prevent spam by limiting submissions per IP:

```javascript
const rateLimit = require("express-rate-limit");
app.use(express.rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 submissions per IP
}));
```

### 5. Add Database (Instead of JSON)
Replace JSON file storage with MongoDB or PostgreSQL for better scalability.

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Detailed API documentation, all endpoints, deployment options |
| **QUICK_START.md** | Fast setup (3 minutes) |
| **DEPLOYMENT.md** | Step-by-step deployment guides for Heroku, Railway, self-hosted |
| **QUICK_SETUP.md** | This file — overview and getting started |

---

## ❓ FAQ

**Q: How do I change my admin token?**
```bash
# Edit backend/data/admin-config.json
# Change the "adminToken" value
# Restart the server with: npm start
```

**Q: Can I change the admin dashboard URL?**
Yes, update in `server.js` and `public/admin.html`

**Q: What if I lose my admin token?**
Edit `backend/data/admin-config.json` directly and restart

**Q: Can I use this on a free tier hosting?**
Yes! Heroku (free tier) or Railway offer free deployments

**Q: How do I backup my messages?**
Download `backend/data/messages.json` — it's a simple JSON file

**Q: Can I integrate with email?**
Yes! See "Customization" section → "Add Email Notifications"

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check Node.js is installed
node --version

# Check no other process is using port 3000
lsof -i :3000

# Try a different port
PORT=3001 npm start
```

### Admin dashboard shows "Unauthorized"
- Check you're using the correct token from `admin-config.json`
- Clear browser cache (Ctrl+Shift+Del / Cmd+Shift+Del)
- Check localStorage in browser console

### Form won't submit
- Check browser console for errors (F12)
- Verify backend is running on `http://localhost:3000`
- Check `script.js` API_URL is correct

### Messages not saving
- Check backend logs: `npm start` (look for errors)
- Verify `backend/data/` directory exists and is writable
- Check disk space available

---

## ✨ Next Steps

1. **Complete Setup**
   ```bash
   cd backend
   npm install
   bash setup.sh
   npm start
   ```

2. **Test Locally**
   - Visit admin dashboard: `http://localhost:3000/admin`
   - Submit test message via portfolio form
   - Verify message appears in dashboard

3. **Optional: Customize**
   - Change admin email in `admin-config.json`
   - Add custom fields to contact form
   - Configure email notifications

4. **Deploy to Production** (when ready)
   - Choose platform: Heroku / Railway / DigitalOcean / Self-hosted
   - Follow guide in `DEPLOYMENT.md`
   - Update frontend API URL to production backend

5. **Update Portfolio Settings**
   - Save your admin token somewhere safe
   - Monitor incoming messages regularly
   - Reply to inquiries from the admin dashboard

---

## 📞 Support & Help

**For detailed technical info:** See `README.md`

**For quick setup:** See `QUICK_START.md`

**For deployment:** See `DEPLOYMENT.md`

**For issues:**
1. Check the browser console (F12) for error messages
2. Check backend logs (`npm start` terminal)
3. Verify your admin token in `admin-config.json`
4. Make sure Node.js 14+ is installed

---

## 🎉 You're All Set!

Your portfolio now has a professional contact system. Users can send messages, and you can manage them from a beautiful admin dashboard.

**Happy collecting! 📧**

---

**Questions?** All documentation is in the `backend/` folder. Start with `QUICK_START.md` if you need help!
