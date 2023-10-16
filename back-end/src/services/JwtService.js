const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const genneralAccessToken = (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );

  return access_token;
};

const genneralRefreshToken = (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );

  return refresh_token;
};
const verifyRefreshTokenService = (refreshToken) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        function (err, decoded) {
          if (err) {
            reject(err);
          }
          const access_token = genneralAccessToken({
            id: decoded.id,
            isAdmin: decoded.isAdmin,
          });
          resolve({
            status: "OK",
            MESSAGE: "SUCCESS",
            access_token,
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  verifyRefreshTokenService,
};
