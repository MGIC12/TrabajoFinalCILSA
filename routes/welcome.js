const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/welcome.html"));
});

module.exports = router;
