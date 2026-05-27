const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to read JSON
app.use(express.json());

// File where data is stored permanently
const DATA_FILE = path.join(__dirname, "data.json");

// Helper: read data safely
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]");
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper: write data
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/**
 * HOME ROUTE
 */
app.get("/", (req, res) => {
  res.send("Form Backend is running 🚀");
});

/**
 * SUBMIT FORM DATA
 */
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newEntry = {
    name,
    email,
    message,
    time: new Date().toISOString()
  };

  // Read existing data
  const data = readData();

  // Add new entry
  data.push(newEntry);

  // Save back to file
  writeData(data);

  // 🔥 REAL-TIME LOG IN TERMUX
  console.log("🔥 New Form Submission:");
  console.log(newEntry);

  res.json({
    status: "success",
    message: "Form submitted successfully"
  });
});

/**
 * GET ALL FORM DATA
 */
app.get("/data", (req, res) => {
  const data = readData();
  res.json(data);
});

/**
 * DELETE ALL DATA (optional admin tool)
 */
app.delete("/data", (req, res) => {
  writeData([]);
  res.json({ status: "cleared" });
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
