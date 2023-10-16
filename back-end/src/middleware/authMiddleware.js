const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        status: "time out ERR",
        message: "time out",
      });
    }

    if (decoded.isAdmin) {
      next();
    } else {
      return res.status(400).json({
        status: "authentication ERR",
        message: "you are not the admin",
      });
    }
  });
};

const userAuthMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        status: "time out ERR",
        message: "time out",
      });
    }

    if (decoded.isAdmin || decoded.id === userId) {
      next();
    } else {
      return res.status(400).json({
        status: "authentication ERR",
        message: "authentication failed",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  userAuthMiddleware,
};
