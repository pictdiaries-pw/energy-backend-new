const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Data storage
let energyData = {
  voltage: 0,
  current: 0,
  power: 0,
  units: 0
};

// 🔹 UPDATE FROM ESP32
app.post("/api/update", (req, res) => {
  energyData = req.body;
  console.log("Received:", energyData);
  res.send("OK");
});

// 🔹 GET DATA (Frontend)
app.get("/api/data", (req, res) => {
  res.json(energyData);
});

// 🔹 RESET UNITS (BUTTON)
app.post("/api/reset", (req, res) => {
  energyData.units = 0;
  console.log("Units reset!");
  res.send("Reset Done");
});

// ROOT
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started"));