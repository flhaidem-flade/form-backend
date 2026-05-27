const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = [];

// Home route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Submit route
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  messages.push({
    name,
    email,
    message
  });

  res.json({
    success: true,
    message: "Message received"
  });
});

// Dashboard route
app.get("/data", (req, res) => {

  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Dashboard</title>
    <style>
      body{
        font-family: Arial;
        background:#0f172a;
        color:white;
        padding:20px;
      }

      .card{
        background:#1e293b;
        padding:15px;
        margin:10px 0;
        border-radius:10px;
      }
    </style>
  </head>
  <body>

    <h1>Messages (${messages.length})</h1>
  `;

  [...messages].reverse().forEach(msg => {
    html += `
      <div class="card">
        <h3>${msg.name}</h3>
        <p>${msg.email}</p>
        <p>${msg.message}</p>
      </div>
    `;
  });

  html += `
  </body>
  </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
