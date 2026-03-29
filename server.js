const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let energyData = {
  voltage: 0,
  current: 0,
  power: 0,
  units: 0
};

let resetFlag = false;

// ESP UPDATE
app.post("/api/update", (req, res) => {
  energyData = req.body;

  // Send reset flag ONCE
  res.send({ reset: resetFlag });

  // 🔥 IMPORTANT FIX
  if (resetFlag === true) {
    resetFlag = false;   // turn OFF after sending
  }
});

// GET DATA
app.get("/api/data", (req, res) => {
  res.json(energyData);
});

// RESET BUTTON
app.post("/api/reset", (req, res) => {
  resetFlag = true;
  energyData.units = 0;
  console.log("Reset triggered!");
  res.send("Reset OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));