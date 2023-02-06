const express = require("express");
const router = express.Router();
const postcontroller = require("../Controller/postcontroller");

router.get("/", postcontroller.getAllPost);

module.exports = router;
