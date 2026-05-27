const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gmail transporter (USES .env)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

// Form endpoint
app.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("📩 Received:", req.body);

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing fields"
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Form Submission",
      text: `
New message from website:

Name: ${name}
Email: ${email}
Message: ${message}
      `
    });

    res.json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (err) {
    console.error("❌ Backend error:", err);

    res.status(500).json({
      success: false,
      message: "Email failed",
      error: err.toString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
