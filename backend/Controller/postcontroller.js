const Post = require("../Modals/Post");
const User = require("../Modals/User");

const post = [
  {
    id: 1,
    name: "Ayush",
    description:
      " I  am the person who love to cooking and doing all the things that are in the field of what important",
  },
];

module.exports.getAllPost = (req, res) => {
  console.log(req.userId);
  return res.status(200).json(post);
};
module.exports.getPostByUser = (req, res) => {
  console.log(req.userId);
  return res.status(200).json(post);
};

module.exports.UpdatePost = (req, res) => {
  console.log(req.userId);
  return res.status(200).json(post);
};

module.exports.createPost = async (req, res) => {
  if (!req.userId) {
    return res.status(400).json({ error: "User Id is missing" });
  }

  const userId = req.userId;
  const { title, detail, imageUrl, public_Id } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const newPost = await Post.create({
        title,
        detail,
        imageUrl,
        public_Id,
        author: userId,
      });

      user.posts.push(newPost);
      await user.save();
      return res.status(200).json(newPost);
    } else {
      return res.status(401).json({ message: "You are not authorized" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports.removePost = (req, res) => {
  console.log(req.userId);
  return res.status(200).json(post);
};
