const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Directories and files
const dataDir = path.join(__dirname, "data");
const messagesFile = path.join(dataDir, "messages.json");
const adminConfigFile = path.join(dataDir, "admin-config.json");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize messages.json if it doesn't exist
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
}

// Initialize admin config if it doesn't exist
if (!fs.existsSync(adminConfigFile)) {
  fs.writeFileSync(
    adminConfigFile,
    JSON.stringify(
      {
        adminToken: process.env.ADMIN_TOKEN || "change-me-in-production",
        adminEmail: process.env.ADMIN_EMAIL || "your-email@example.com",
      },
      null,
      2
    )
  );
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

/* =====================================================================
   UTILITY FUNCTIONS
   ===================================================================== */

function readMessages() {
  try {
    const data = fs.readFileSync(messagesFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading messages:", err);
    return [];
  }
}

function writeMessages(messages) {
  try {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    return true;
  } catch (err) {
    console.error("Error writing messages:", err);
    return false;
  }
}

function getAdminConfig() {
  try {
    const data = fs.readFileSync(adminConfigFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading admin config:", err);
    return {};
  }
}

function verifyAdminToken(token) {
  const config = getAdminConfig();
  return token === config.adminToken;
}

/* =====================================================================
   API ENDPOINTS
   ===================================================================== */

/**
 * POST /api/contact
 * Receive a new contact form submission
 */
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields (name, email, subject, message) are required.",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email format.",
    });
  }

  // Create message object
  const newMessage = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
    read: false,
    archived: false,
  };

  // Read existing messages
  let messages = readMessages();

  // Add new message
  messages.unshift(newMessage); // Newest first

  // Write back to file
  if (writeMessages(messages)) {
    console.log(`[${newMessage.timestamp}] New message from ${name}`);
    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received.",
      id: newMessage.id,
    });
  } else {
    res.status(500).json({
      success: false,
      error: "Failed to save message. Please try again later.",
    });
  }
});

/**
 * GET /api/messages
 * Retrieve all messages (admin only)
 * Query params:
 *   - token: admin token
 *   - archived: filter by archived status (true/false)
 */
app.get("/api/messages", (req, res) => {
  const { token, archived } = req.query;

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized. Invalid or missing admin token.",
    });
  }

  let messages = readMessages();

  // Filter by archived status if specified
  if (archived !== undefined) {
    const isArchived = archived === "true";
    messages = messages.filter((m) => m.archived === isArchived);
  }

  res.json({
    success: true,
    count: messages.length,
    messages,
  });
});

/**
 * PATCH /api/messages/:id
 * Update a message (mark as read/archived, delete, etc.)
 * Body: { token, read?: boolean, archived?: boolean }
 */
app.patch("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const { token, read, archived } = req.body;

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized. Invalid or missing admin token.",
    });
  }

  let messages = readMessages();
  const messageIndex = messages.findIndex((m) => m.id === id);

  if (messageIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Message not found.",
    });
  }

  // Update fields
  if (read !== undefined) messages[messageIndex].read = read;
  if (archived !== undefined) messages[messageIndex].archived = archived;

  if (writeMessages(messages)) {
    res.json({
      success: true,
      message: "Message updated successfully.",
      data: messages[messageIndex],
    });
  } else {
    res.status(500).json({
      success: false,
      error: "Failed to update message.",
    });
  }
});

/**
 * DELETE /api/messages/:id
 * Delete a message (admin only)
 */
app.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const { token } = req.body;

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized. Invalid or missing admin token.",
    });
  }

  let messages = readMessages();
  const initialLength = messages.length;
  messages = messages.filter((m) => m.id !== id);

  if (messages.length === initialLength) {
    return res.status(404).json({
      success: false,
      error: "Message not found.",
    });
  }

  if (writeMessages(messages)) {
    res.json({
      success: true,
      message: "Message deleted successfully.",
    });
  } else {
    res.status(500).json({
      success: false,
      error: "Failed to delete message.",
    });
  }
});

/**
 * GET /api/stats
 * Get statistics about messages (admin only)
 */
app.get("/api/stats", (req, res) => {
  const { token } = req.query;

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized. Invalid or missing admin token.",
    });
  }

  const messages = readMessages();
  const unread = messages.filter((m) => !m.read).length;
  const archived = messages.filter((m) => m.archived).length;

  res.json({
    success: true,
    stats: {
      total: messages.length,
      unread,
      read: messages.length - unread,
      archived,
      active: messages.length - archived,
    },
  });
});

/* =====================================================================
   STARTUP
   ===================================================================== */
app.listen(PORT, () => {
  console.log(`✓ Portfolio contact backend running on http://localhost:${PORT}`);
  console.log(`✓ Admin dashboard: http://localhost:${PORT}/admin`);
  console.log(`✓ API docs: POST /api/contact, GET /api/messages, etc.`);
  console.log(`⚠ IMPORTANT: Update ADMIN_TOKEN in backend/data/admin-config.json`);
});
