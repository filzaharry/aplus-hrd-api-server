require('dotenv').config();
const jsonwebtoken = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // const token = req.headers.authorization.split('Authorization')[1];
  const token = req.header('Authorization');
  // console.log('Autho', token);

  if (!token) {
    return res.status(401).json({
      message: "tidak ada token",
    });
  }

  // const decode = await jsonwebtoken.verify(token.split(" ")[1].toString(),'secret',process.env.JWT_SECRET);
  const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  // console.log("decode", decode);
  req.id = decode.id;
  next()
};