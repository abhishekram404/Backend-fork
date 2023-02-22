const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Modals/User");

module.exports.userLogin = async (req, res) => {
  const { password, email } = req.body;

  try {
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
      const isValidPassword = await bcrypt.compareSync(
        password,
        isExistUser.password
      );
      if (isValidPassword) {
        const token = jwt.sign({ id: isExistUser._id }, "tokenGenerate");
        return res.status(200).json({
          status: 200,
          data: {
            id: isExistUser._id,
            username: isExistUser.username,
            email: isExistUser.email,
            token,
          },
        });
      } else {
        return res
          .status(400)
          .json({ message: "Password Incorrect Please Check Your Password " });
      }
    }
    return res
      .status(401)
      .json({ message: "User Not Found Please Login as soon as Possible " });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.userSignup = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const isExistUser = await User.findOne({ email: email });

    if (isExistUser) {
      return res
        .status(400)
        .json({ status: 400, message: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ status: 201, message: "User Successfully Registered " });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Incorrect" });
  }
};
