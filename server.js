const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// In-memory store
let energyData = {
  voltage: 0,
  current: 0,
  power: 0,
  units: 0,
  timestamp: new Date().toISOString()
};

// POST (ESP32 → backend)
app.post("/api/update", (req, res) => {
  energyData = {
    ...req.body,
    timestamp: new Date().toISOString()
  };
  console.log("Received:", energyData);
  res.status(200).send("OK");
});

// GET (React → backend)
app.get("/api/data", (req, res) => {
  res.json(energyData);
});

// Root (health check)
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// Render port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});