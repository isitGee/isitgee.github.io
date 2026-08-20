# Portfolio Contact Backend

A simple Node.js/Express backend to collect and manage contact form messages from your portfolio website.

## Features

- 📧 **REST API** for receiving contact form submissions
- 🔐 **Token-based authentication** for admin access
- 📊 **Admin Dashboard** to view, manage, and organize messages
- 💾 **File-based storage** (JSON) — no database setup required
- 🔄 **Message management** (mark as read, archive, delete)
- 📈 **Statistics** (total, unread, archived counts)
- 🎯 **Filter & search** unread and archived messages

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Admin Token (Important!)

Edit `backend/data/admin-config.json` and change the default admin token:

```json
{
  "adminToken": "your-super-secret-token-here",
  "adminEmail": "your-email@example.com"
}
```

**Generate a strong token:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Run the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3000`

### 4. Access the Admin Dashboard

Open your browser and go to: `http://localhost:3000/admin`

Login with your admin token.

---

## API Endpoints

### Submit a Contact Message

```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you! Your message has been received,",
  "id": "1692547200000"
}
```

---

### Get All Messages (Admin Only)

```http
GET /api/messages?token=YOUR_ADMIN_TOKEN
```

**Query Parameters:**
- `token` — Your admin token (required)
- `archived` — Filter by status: `true` or `false` (optional)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "messages": [
    {
      "id": "1692547200000",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I'd like to discuss...",
      "timestamp": "2024-08-20T10:30:00.000Z",
      "read": false,
      "archived": false
    }
  ]
}
```

---

### Update a Message (Mark as Read/Archived)

```http
PATCH /api/messages/:id
Content-Type: application/json

{
  "token": "YOUR_ADMIN_TOKEN",
  "read": true,
  "archived": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message updated successfully.",
  "data": { /* updated message object */ }
}
```

---

### Delete a Message

```http
DELETE /api/messages/:id
Content-Type: application/json

{
  "token": "YOUR_ADMIN_TOKEN"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message deleted successfully."
}
```

---

### Get Statistics

```http
GET /api/stats?token=YOUR_ADMIN_TOKEN
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 10,
    "unread": 3,
    "read": 7,
    "archived": 2,
    "active": 8
  }
}
```

---

## Admin Dashboard Guide

### Accessing the Dashboard

1. Navigate to `http://localhost:3000/admin`
2. Enter your admin token
3. Click **Login**

### Message Management

#### View Messages
- **Active** — All non-archived messages
- **Unread** — Messages you haven't marked as read
- **Archived** — Archived messages
- **All** — All messages

#### Manage Individual Messages

For each message, you can:

- **✓ Mark as Read** — Hide from unread count
- **Archive** — Move to archived section
- **Restore** — Move archived message back to active
- **Delete** — Permanently remove message
- **Reply** — Opens your email client with the sender's address pre-filled

#### Quick Stats

The header shows:
- **Total** — All messages received
- **Unread** — Messages requiring attention
- **Archived** — Archived messages

---

## Frontend Integration

The frontend in `script.js` automatically connects to the backend:

```javascript
fetch(`${API_URL}/api/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  })
})
```

### Local Development

When running locally (`localhost:3000`), the form will submit to `http://localhost:3000/api/contact`.

### Production Deployment

When deployed to production, the form will submit to your domain's `/api/contact` endpoint. You'll need to host the backend on the same domain or configure CORS appropriately.

---

## Deployment

### Option 1: Deploy on Heroku (Free)

1. Create a Heroku account and install the CLI
2. Login: `heroku login`
3. Create an app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set ADMIN_TOKEN="your-secure-token" -a your-app-name
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```
6. Access at: `https://your-app-name.herokuapp.com/admin`

### Option 2: Deploy on Railway/Render (Recommended)

1. Push your code to GitHub
2. Connect your repo to Railway or Render
3. Set environment variables in the dashboard
4. Deploy with one click

### Option 3: Self-hosted (VPS/Digital Ocean)

1. SSH into your server
2. Clone the repository
3. Install Node.js: `curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
4. Install dependencies: `npm install`
5. Start with a process manager (PM2): `npm install -g pm2` and `pm2 start server.js`
6. Configure a reverse proxy (nginx) to forward requests to port 3000

---

## Environment Variables

Create a `.env` file in the `backend/` directory (optional):

```
PORT=3000
ADMIN_TOKEN=your-secure-token-here
ADMIN_EMAIL=your-email@example.com
NODE_ENV=production
```

---

## File Structure

```
backend/
├── server.js                 # Main Express server
├── package.json              # Dependencies
├── public/
│   └── admin.html           # Admin dashboard UI
└── data/
    ├── admin-config.json    # Admin token & config
    └── messages.json        # Stored messages (auto-created)
```

---

## Security Considerations

### Token Management

- **Change the default token** before deploying to production
- Use a **strong, random token** (at least 32 characters)
- Store tokens in **environment variables** on production servers
- Never commit real tokens to version control

### CORS & HTTPS

- In production, always use **HTTPS**
- Verify the frontend domain is allowed to make requests
- Consider limiting requests by rate-limiting or CORS origin checks

### Data Privacy

- Messages are stored locally in `messages.json`
- No automatic email notifications (you check the dashboard)
- Consider adding encryption for sensitive data in production

---

## Troubleshooting

### "Message says sent but I don't see it in the admin dashboard"

1. Check the browser console (F12) for network errors
2. Verify the backend is running: `http://localhost:3000`
3. Confirm the API endpoint URL in `script.js`

### "Unauthorized" error when accessing dashboard

1. Verify you're using the correct admin token from `admin-config.json`
2. Ensure the token hasn't changed
3. Check the browser's localStorage (F12 → Application → localStorage)

### "Cannot find module 'express'" after npm install

1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Ensure you're using Node.js 14+: `node --version`

### Port 3000 is already in use

Change the port in `server.js` or stop the existing process:

```bash
# Find process on port 3000
lsof -i :3000

# Kill it
kill -9 <PID>
```

Or set a different port:

```bash
PORT=3001 npm start
```

---

## Customization

### Extend the API

Add custom fields to the contact form:

1. Update the HTML form in `index.html` (add new input fields)
2. Update `script.js` to include new fields in the fetch body
3. Update `server.js` validation to accept new fields

### Customize the Admin Dashboard

The dashboard is in `backend/public/admin.html`. You can:

- Change colors and styling
- Add additional message fields
- Integrate with email notifications
- Add user roles and permissions

### Add Email Notifications

Integrate with Nodemailer to send email notifications when new messages arrive:

```javascript
const nodemailer = require("nodemailer");

// In the POST /api/contact endpoint:
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "your-email@gmail.com", pass: "your-app-password" }
});

transporter.sendMail({
  from: "your-email@gmail.com",
  to: config.adminEmail,
  subject: `New message: ${subject}`,
  html: `<p>From: ${name} (${email})</p><p>${message}</p>`
});
```

---

## Support

For issues or questions:

1. Check the console for error messages
2. Review this README and the API docs
3. Test the API with tools like Postman or cURL

---

## License

MIT — Feel free to use and modify for your portfolio.
