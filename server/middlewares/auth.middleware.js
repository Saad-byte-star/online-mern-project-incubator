const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async function (req, res, next) {
  try {
    const token = req.get(process.env.JWT_TOKEN_HEADER || "X-Auth-Token");
    console.log("Recieve Token : " ,token);
    const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decrypted : " , tokenData);
    const user = await User.findById(tokenData.id);
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(401).json({ message: "session expired" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "session expired" });
  }
};

module.exports = {
  authenticate,
//   authorize,
};
