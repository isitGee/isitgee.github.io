#!/bin/bash

# Quick setup script for portfolio contact backend

echo "🚀 Setting up Portfolio Contact Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    exit 1
fi

echo "✓ Node.js detected: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate a secure token
echo ""
echo "🔐 Generating secure admin token..."
TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Update admin-config.json
echo "⚙️  Updating admin configuration..."
node -e "
const fs = require('fs');
const config = {
  adminToken: '$TOKEN',
  adminEmail: 'your-email@example.com'
};
fs.writeFileSync('./data/admin-config.json', JSON.stringify(config, null, 2));
"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Your Admin Token: $TOKEN"
echo ""
echo "📝 Next steps:"
echo "  1. Edit backend/data/admin-config.json and update 'adminEmail'"
echo "  2. Run: npm start"
echo "  3. Visit: http://localhost:3000/admin"
echo "  4. Login with your token: $TOKEN"
echo ""
echo "⚠️  IMPORTANT: Keep your admin token secure!"
echo ""
