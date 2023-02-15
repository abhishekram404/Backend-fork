const Post = require("../Modals/Post");
const User = require("../Modals/User");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const post = [
  {
    id: 1,
    name: "Ayush",
    description:
      " I  am the person who love to cooking and doing all the things that are in the field of what important",
  },
];

module.exports.getAllPost = (req, res) => {
  return res.status(200).json(post);
};
module.exports.getPostByUser = (req, res) => {
  return res.status(200).json(post);
};

module.exports.UpdatePost = async (req, res) => {
  const { title, image, detail, post_id } = req.body;
  if (req?.files || req?.files?.image) {
    return res.status(400).json("please provide image file ");
  } else {
    try {
      await Post.findByIdAndUpdate(
        { _id: post_id },
        {
          title,
          detail,
        }
      );
      return res.status(200).json("Successfully Updated");
    } catch (error) {
      return res.status(200).json("Something Went Wrong");
      console.log(error);
    }
  }
};

module.exports.createPost = async (req, res) => {
  if (!req.userId) {
    return res.status(400).json({ error: "User Id is missing" });
  }

  const userId = req.userId;
  const { title, detail, image } = req.body;
  // image ko process yeha batw start vaxa
  try {
    // post banuda file ayo ki nai vnerw check grna prxa tesko  file ayo vney tala jnxa ayena vney Please provide image file vnerw dekhuxa
    if (!req.files || !req.files.image) {
      return res.status(400).json("please provide image file ");
    }

    const file = req.files.image;
    const fileName = path.extname(file.name);
    const extensions = [".png", ".jpg", ".jpeg"];

    if (!extensions.includes(fileName)) {
      return res.status(400).json("please provide valid image file ");
    }
    // direct ako file lai cloudnary mah pathuna mildaina tei varw  file.mv wala method use gareko
    file.mv(`./uploads/${file.name}`, (err) => {
      // console.log(err);
    });
    // yeoha samaa ko image ko upload grni code

    cloudinary.config({
      api_key: "812785993884176",
      api_secret: "zTUxCL1yJ-XxuAczyy5pEHuWcqw",
      cloud_name: "dozx6bl1g",
    });
    cloudinary.uploader.upload(
      `./uploads/${file.name}`,
      { upload_preset: "sample_img" },
      async (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            status: 401,
            message: `$(err)`,
          });
        } else {
          fs.unlink(`./uploads/${file.name}`, (error) => {});
          const user = await User.findOne({ _id: userId });
          if (user) {
            const newPost = await Post.create({
              title,
              detail,
              image: result.secure_url,
              public_Id: result.public_id,
              author: userId,
            });
            user.posts.push(newPost);
            await user.save();
            return res.status(200).json(newPost);
          } else {
            return res.status(401).json({ message: "You are not authorized" });
          }
        }
      }
    );
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports.removePost = async (req, res) => {
  const { post_id, public_id } = req.body;
  try {
    cloudinary.config({
      api_key: "812785993884176",
      api_secret: "zTUxCL1yJ-XxuAczyy5pEHuWcqw",
      cloud_name: "dozx6bl1g",
    });
    const response = await cloudinary.uploader.destroy(public_id);
    if (response.result === "not found") {
      return res.status(200).json(response);
    } else {
      await Post.findByIdAndDelete({ _id: post_id });
      return res.status(200).json("Successfully Remove");
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({ post_id, public_id });
};

// //const { v4: uuidv4 } = require('uuid');
// // ...

// const file = req.files.image;
// const extension = path.extname(file.name);
// const fileName = `${uuidv4()}${extension}`;

// file.mv(`./uploads/${fileName}`, (err) => {
//   if (err) {
//     return res.status(500).json({ error: "Failed to upload image" });
//   }
//   console.log("Photo displayed successfully");
//   // continue with other operations
// });
