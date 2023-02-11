const express = require("express");
const router = express.Router();
const postcontroller = require("../Controller/postcontroller");
const auth = require("../Middleware/check_auth");

router.get("/", auth.checkAuth, postcontroller.getAllPost);

module.exports = router;
