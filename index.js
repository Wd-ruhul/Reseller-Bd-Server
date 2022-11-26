const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//* middleware
app.use(cors());
app.use(express.json());







app.get("/", (req, res) => {
  res.send("Resell Dot Com server Running");
});

app.listen(port, () => {
  console.log(`Resell Dot Com  running on port ${port}`);
});