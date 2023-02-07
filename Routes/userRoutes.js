const express = require("express");
const router = require("./postRoutes");
const Router = express.Router;
const joi = require("joi");
const validation = require("express-joi-validation").createValidator({});
const userController = require("../Controller/usercontroller");
const { createValidator } = require("express-joi-validation");

const LoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().max(20),
});
const SignUpSchema = joi.object({
  username: joi.string().min(5).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().required().max(20),
});

router.post(
  "/api/userLogin",
  validation.body(LoginSchema),
  userController.userLogin
);
router.post(
  "/api/userSignup",
  validation.body(SignUpSchema),
  userController.userSignup
);

module.exports = router;
