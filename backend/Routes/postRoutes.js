const express = require("express");
const router = express.Router();
const postcontroller = require("../Controller/postcontroller");
const auth = require("../Middleware/check_auth");
const joi = require("joi");
const validation = require("express-joi-validation").createValidator({});

const PostSchema = joi.object({
  title: joi.string().required(),
  detail: joi.string().required().max(200),
  imageUrl: joi.string().required(),
  public_Id: joi.string().required(),
});

const noAllow = (req, res) =>
  res.status(405).json({
    status: 405,
    message: "method not allowed",
  });
router.get("/", auth.checkAuth, postcontroller.getAllPost);

router
  .route("/api/createPost")
  .post(auth.checkAuth, validation.body(PostSchema), postcontroller.createPost)
  .all(noAllow);

router.patch("/api/updatePost/:id", auth.checkAuth, postcontroller.UpdatePost);
router.get("/api/getPostUser", auth.checkAuth, postcontroller.getPostByUser);
router.delete("/api/removePost/:id", auth.checkAuth, postcontroller.removePost);

module.exports = router;
