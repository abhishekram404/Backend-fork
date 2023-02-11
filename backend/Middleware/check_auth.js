const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decode = jwt.decode(token, "tokenGenerate");
      req.userId = decode.userId;
      // console.log(decode);
      if (decode) {
        next();
      } else {
        res
          .status(401)
          .json({ message: "You are not authorized", status: 401 });
      }
    } else {
      res.status(401).json({ message: "You are not authorized", status: 401 });
    }
    console.log(token);
  } catch (error) {
    res.status(401).json({ message: "You are not authorized", status: 401 });
    console.log("Token not found");
  }
};
