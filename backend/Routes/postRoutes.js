const express = require("express");
const router = express.Router();
const postcontroller = require("../Controller/postcontroller");
const auth = require("../Middleware/check_auth");
const joi = require("joi");
const validation = require("express-joi-validation").createValidator({});

const PostSchema = joi.object({
  title: joi.string().required(),
  detail: joi.string().required().max(200),
  image: joi.optional(),
});
const removeSchema = joi.object({
  post_id: joi.string().required(),
  public_id: joi.string().required(),
});
const updateSchema = joi.object({
  title: joi.string().required(),
  detail: joi.string().required(),
  image: joi.optional(),
  post_id: joi.string().required(),
  public_id: joi.optional(),
});

const noAllow = (req, res) =>
  res.status(405).json({
    status: 405,
    message: "method not allowed",
  });

router.get("/", auth.checkAuth, postcontroller.getAllPost);

router
  .route("/api/createPost")
  .post(auth.checkAuth, validation.body(PostSchema), postcontroller.createPost) // validation.body(PostSchema) yeo rakhna xa
  .all(noAllow);

router.patch(
  "/api/post/update",
  auth.checkAuth,
  validation.body(updateSchema),
  postcontroller.UpdatePost
);
router.get("/api/getPostUser", auth.checkAuth, postcontroller.getPostByUser);
router.delete(
  "/api/post/remove",
  auth.checkAuth,
  validation.body(removeSchema),
  postcontroller.removePost
);

module.exports = router;
