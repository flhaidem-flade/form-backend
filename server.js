app.get("/data", (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Admin Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <style>
      body {
        margin: 0;
        font-family: Arial;
        background: #0f172a;
        color: white;
        padding: 20px;
      }

      h1 {
        text-align: center;
        margin-bottom: 20px;
        color: #38bdf8;
      }

      .container {
        max-width: 900px;
        margin: auto;
      }

      .card {
        background: rgba(255,255,255,0.06);
        padding: 15px;
        margin: 10px 0;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1);
        transition: 0.3s;
      }

      .card:hover {
        transform: scale(1.02);
        border-color: #38bdf8;
      }

      .name {
        font-size: 18px;
        font-weight: bold;
        color: #38bdf8;
      }

      .email {
        font-size: 13px;
        color: #94a3b8;
        margin-bottom: 8px;
      }

      .message {
        font-size: 15px;
        color: #e2e8f0;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .count {
        background: #38bdf8;
        color: black;
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <div class="container">

      <div class="topbar">
        <h1>📊 Admin Dashboard</h1>
        <div class="count">${messages.length} messages</div>
      </div>
  `;

  messages.reverse().forEach(msg => {
    html += `
      <div class="card">
        <div class="name">${msg.name}</div>
        <div class="email">${msg.email}</div>
        <div class="message">${msg.message}</div>
      </div>
    `;
  });

  html += `
    </div>
  </body>
  </html>
  `;

  res.send(html);
});
