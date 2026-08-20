# 📦 Deployment Guide

Complete instructions for deploying your contact backend to production.

## Prerequisites

- Node.js 14+ installed on your server
- A domain name (optional, but recommended)
- Basic terminal knowledge

---

## Option 1: Heroku (Recommended for Beginners)

**Pros:** Free tier available, easy setup, automatic HTTPS  
**Cons:** Limited to 550 free dyno hours/month

### Step-by-Step

1. **Create Heroku account** at https://www.heroku.com

2. **Install Heroku CLI**
   ```bash
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create an app**
   ```bash
   heroku create your-portfolio-backend
   ```

5. **Set environment variables**
   ```bash
   heroku config:set ADMIN_TOKEN="your-secure-token-here" \
     ADMIN_EMAIL="your-email@example.com" \
     NODE_ENV="production"
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **Check if running**
   ```bash
   heroku logs --tail
   ```

8. **Access your backend**
   - Admin dashboard: `https://your-portfolio-backend.herokuapp.com/admin`
   - API: `https://your-portfolio-backend.herokuapp.com/api/contact`

### Update Your Frontend

In `script.js`, update the API URL:

```javascript
const API_URL = "https://your-portfolio-backend.herokuapp.com";
```

---

## Option 2: Railway.app (Recommended)

**Pros:** Modern interface, easy deployment, generous free tier  
**Cons:** Still relatively new platform

### Step-by-Step

1. **Create Railway account** at https://railway.app

2. **Create new project**
   - Click "Create Project"
   - Select "Deploy from GitHub"

3. **Connect your GitHub repo**
   - Authorize Railway to access your GitHub
   - Select `isitgee.github.io` repository

4. **Configure build settings**
   - Railway auto-detects Node.js
   - Root directory: `backend`
   - Start command: `npm start`

5. **Add environment variables**
   - Go to Variables tab
   - Add:
     ```
     ADMIN_TOKEN=your-secure-token-here
     ADMIN_EMAIL=your-email@example.com
     NODE_ENV=production
     PORT=3000
     ```

6. **Deploy**
   - Click "Deploy"
   - Railway will automatically build and deploy

7. **Get your domain**
   - Railway generates a domain automatically
   - Or connect your custom domain

### Update Your Frontend

```javascript
const API_URL = "https://your-railway-domain.railway.app";
```

---

## Option 3: DigitalOcean App Platform

**Pros:** Scalable, reliable, good documentation  
**Cons:** Paid tier starts at $12/month

### Step-by-Step

1. **Create DigitalOcean account** at https://digitalocean.com

2. **Create new App**
   - Click "Apps"
   - Click "Create Apps"
   - Select GitHub repository

3. **Select GitHub repository**
   - Select `isitgee.github.io`
   - Select `main` branch

4. **Configure component**
   - DigitalOcean auto-detects Node.js
   - Source: `backend` directory
   - Build command: `npm install`
   - Run command: `npm start`

5. **Add environment variables**
   - In settings, add:
     ```
     ADMIN_TOKEN=your-secure-token-here
     ADMIN_EMAIL=your-email@example.com
     NODE_ENV=production
     ```

6. **Deploy**
   - DigitalOcean handles everything
   - Your app gets a `.ondigitalocean.app` domain

### Update Your Frontend

```javascript
const API_URL = "https://your-app.ondigitalocean.app";
```

---

## Option 4: Self-Hosted VPS (Advanced)

**Pros:** Full control, potentially cheaper at scale  
**Cons:** Need to manage server updates, SSL certificates, etc.

### Prerequisites

- VPS from DigitalOcean, Linode, AWS, or similar (~$5-10/month)
- SSH access to server
- Domain name pointing to server

### Step-by-Step

1. **SSH into your server**
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone your repository**
   ```bash
   git clone https://github.com/isitGee/isitgee.github.io.git
   cd isitgee.github.io/backend
   ```

4. **Install dependencies**
   ```bash
   npm install --production
   ```

5. **Create environment file**
   ```bash
   cat > .env << EOF
   PORT=3000
   ADMIN_TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
   ADMIN_EMAIL=your-email@example.com
   NODE_ENV=production
   EOF
   ```

6. **Install PM2 (process manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "portfolio-backend"
   pm2 startup
   pm2 save
   ```

7. **Install Nginx (reverse proxy)**
   ```bash
   sudo apt-get install nginx
   ```

8. **Configure Nginx**
   ```bash
   sudo tee /etc/nginx/sites-available/portfolio << EOF
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade \$http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host \$host;
       proxy_cache_bypass \$http_upgrade;
     }
   }
   EOF
   ```

9. **Enable site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Install SSL (free with Certbot)**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d your-domain.com
    ```

11. **Update frontend**
    ```javascript
    const API_URL = "https://your-domain.com";
    ```

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Backend is running (`https://your-backend-url/admin`)
- [ ] Admin dashboard loads
- [ ] Can login with admin token
- [ ] Portfolio form submits without errors
- [ ] Message appears in admin dashboard
- [ ] HTTPS is enabled (green lock icon)
- [ ] Messages are saved correctly

---

## Monitoring & Maintenance

### Check Logs

**Heroku:**
```bash
heroku logs --tail
```

**Railway:**
Access via Railway dashboard

**DigitalOcean App:**
Access via App Platform dashboard

**Self-hosted:**
```bash
pm2 logs portfolio-backend
```

### Update Code

After pushing updates to GitHub:

**Heroku:**
```bash
git push heroku main
```

**Railway/DigitalOcean:**
Auto-deploys on push

**Self-hosted:**
```bash
git pull
npm install
pm2 restart portfolio-backend
```

---

## Troubleshooting

### "Cannot GET /" when visiting backend URL

- Check if server is running
- Verify correct domain/URL
- Check firewall settings

### "Unauthorized" when accessing admin

- Verify admin token is correct
- Check environment variables are set
- Clear browser cache/localStorage

### Messages not saving

- Check server logs for errors
- Verify write permissions on `data/` directory
- Check disk space available

### SSL certificate issues

**Heroku/Railway:** Automatic, no action needed

**Self-hosted:** Renew certificate
```bash
sudo certbot renew
```

---

## Security Best Practices

1. ✅ Use strong, random admin tokens (32+ characters)
2. ✅ Always use HTTPS in production
3. ✅ Keep Node.js and dependencies updated
4. ✅ Use environment variables for secrets
5. ✅ Limit request rates (add rate limiting middleware)
6. ✅ Regularly backup message data
7. ✅ Monitor logs for suspicious activity

---

## Getting Your Domain

If you don't have one yet:

1. **Namecheap** - Budget-friendly
2. **Google Domains** - Simple, integrated
3. **Cloudflare** - Free DNS with many features

### Pointing Domain to Your Backend

**For Heroku:**
```
CNAME: your-portfolio-backend.herokuapp.com
```

**For Railway/DigitalOcean:**
Use the CNAME provided by the platform

**For Self-hosted VPS:**
```
A record: your-server-ip
```

---

## Cost Comparison

| Platform | Cost | Setup Difficulty |
|----------|------|------------------|
| Heroku | Free (limited) / $7/month | Easy |
| Railway | Free (limited) / $5/month | Easy |
| DigitalOcean App | $12/month | Moderate |
| Self-hosted VPS | $5-10/month | Hard |

---

**Deployed successfully?** Update this document with your experience to help others!
