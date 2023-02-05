const express = require("express");
const router = express.Router();
const postcontroller = require("../Controller/postcontroller.js");

router.get("/", postcontroller.getData);

router.get("/about", (req, res) => {
  res.sendFile("../Views/About.html", { root: __dirname });
  // res.send("I will get this");
});

router.use((req, res) => {
  res.status(400).send("Page Not Found");
});

module.exports = router;
