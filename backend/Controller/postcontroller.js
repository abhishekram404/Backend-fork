const Post = require("../Modals/Post");
const User = require("../Modals/User");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { isValidObjectId } = require("mongoose");
const { response } = require("express");

const post = [
  {
    id: 1,
    name: "Ayush",
    description:
      " I  am the person who love to cooking and doing all the things that are in the field of what important",
  },
];

module.exports.getAllPost = async (req, res) => {
  try {
    const response = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};
module.exports.getPostByUser = async (req, res) => {
  const userId = req.userId;
  try {
    const posts = await User.findById({ _id: userId }).populate("posts");
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};
// cloudinary.config({
//   api_key: "812785993884176",
//   api_secret: "zTUxCL1yJ-XxuAczyy5pEHuWcqw",
//   cloud_name: "dozx6bl1g",
// });
module.exports.UpdatePost = async (req, res) => {
  const { title, detail, post_id, public_id } = req.body;

  try {
    if (isValidObjectId(post_id)) {
      if (req.files?.image && public_id) {
        const file = req.files.image;
        const fileName = path.extname(file.name);
        const extensions = [".png", ".jpg", ".jpeg", ".CR3", ".JPG"];

        if (!extensions.includes(fileName)) {
          return res.status(400).json({
            message: "please provide valid image file",
            status: 400,
          });
        }
        cloudinary.config({
          api_key: "812785993884176",
          api_secret: "zTUxCL1yJ-XxuAczyy5pEHuWcqw",
          cloud_name: "dozx6bl1g",
        });

        cloudinary.uploader.destroy(public_id);

        file.mv(`./uploads/${file.name}`, (err) => {
          // console.log(err);
        });

        cloudinary.uploader.upload(
          `./uploads/${file.name}`,
          { upload_preset: "sample_img" },
          async (err, result) => {
            if (err) {
              return res.status(401).json({
                status: 401,
                message: `${err.message}`,
              });
            } else {
              fs.unlink(`./uploads/${file.name}`, (err) => {});

              const response = await Post.findByIdAndUpdate(
                { _id: post_id },
                {
                  title,
                  detail,
                  image: result.secure_url,
                  public_id: result.public_id,
                }
              );

              return res.status(201).json(response);
            }
          }
        );
      } else {
        await Post.findByIdAndUpdate(
          { _id: post_id },
          {
            title,
            detail,
          }
        );

        return res.status(200).json({
          status: 200,
          message: "successfully updated",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: "please provide valid id",
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      status: 400,
      message: err,
    });
  }
};

// cloudinary.config({
//   api_key: "812785993884176",
//   api_secret: "zTUxCL1yJ-XxuAczyy5pEHuWcqw",
//   cloud_name: "dozx6bl1g",
// });
module.exports.createPost = async (req, res) => {
  const userId = req.userId;
  if (!req.userId) {
    return res.status(400).json({ error: "User Id is missing" });
  }

  const { title, detail } = req.body;
  // image ko process yeha batw start vaxa
  try {
    // post banuda file ayo ki nai vnerw check grna prxa tesko  file ayo vney tala jnxa ayena vney Please provide image file vnerw dekhuxa
    if (!req.files || !req.files.image) {
      return res.status(400).json("please provide image file ");
    }

    const file = req.files.image;
    const fileName = path.extname(file.name);
    const extensions = [".png", ".jpg", ".jpeg", ".JPG"];

    if (!extensions.includes(fileName)) {
      return res.status(400).json("please provide valid image file ");
    }
    // direct ako file lai cloudnary mah pathuna mildaina tei varw  file.mv  ly auta folder garuxa directory mah tei varw paila photo directory mah upload hunxa ani balaa Cloudinary mah jnxa wala method use gareko
    file.mv(`./uploads/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          status: 400,
          message: "Failed to upload file",
        });
      }
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
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

module.exports.removePost = async (req, res) => {
  const { post_id, public_id } = req.query;
  try {
    cloudinary.config({
      api_key: "812785993884176",
      api_secret: "zTUxCL1yJ-XxuAczyy5pEHuWcqw",
      cloud_name: "dozx6bl1g",
    });
    if (isValidObjectId(post_id)) {
        await Post.findByIdAndDelete({ _id: post_id });
        return res.status(200).json("Successfully Remove");
    } else {
      return res.status(400).json({
        status: 400,
        message: "id not valid",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({ post_id, public_id });
};
