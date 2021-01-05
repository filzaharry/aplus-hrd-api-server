require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  //   console.log('authorization', token);

  if (!token) {
    return res.status(401).jsonwebtoken({
      message: "tidak ada token",
    });
  }
  const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  //   console.log("decode", decode);
  req.id = decode.id;
  next()
};
