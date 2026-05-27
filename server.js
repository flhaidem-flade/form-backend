const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = [];

// HOME TEST ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// SUBMIT ROUTE
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  messages.push({ name, email, message });

  res.json({ success: true });
});

// DATA DASHBOARD
app.get("/data", (req, res) => {
  let html = `
  <h1>Messages</h1>
  <p>Total: ${messages.length}</p>
  `;

  messages.forEach(m => {
    html += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <b>${m.name}</
