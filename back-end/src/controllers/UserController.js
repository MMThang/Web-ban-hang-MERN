const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, comfirmPassword } = req.body;

    if (!name || !email || !password || !comfirmPassword) {
      return res.status(400).json({
        status: "input ERR",
        message: "input is required",
      });
    }
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const isCheckEmail = reg.test(email);
    if (!isCheckEmail) {
      return res.status(400).json({
        status: "email ERR",
        message: "input is not email",
      });
    }
    const respond = await UserService.createUserService(req.body);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "input ERR",
        message: "input is required",
      });
    }
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const isCheckEmail = reg.test(email);
    if (!isCheckEmail) {
      return res.status(400).json({
        status: "email ERR",
        message: "input is not email",
      });
    }
    const respond = await UserService.loginUserService(req.body);
    // const { refresh_token, ...rest } = respond;
    // res.cookie("refresh_token", refresh_token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "none",
    // });
    return res.status(200).json(/*rest*/ respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");

    return res.status(200).json({
      status: "OK",
      message: "Logout OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const respond = await UserService.getAllUserService();
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const respond = await UserService.getOneUserService(userId);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.id;

    const respond = await UserService.updateUserService(userId, data);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const respond = await UserService.deleteUserService(userId);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// const verifyRefreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refresh_token;
//     if (!refreshToken) {
//       return res.status(400).json({
//         status: "token ERR",
//         message: "missing token",
//       });
//     }

//     const respond = await JwtService.verifyRefreshTokenService(refreshToken);
//     return res.status(200).json(respond);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error);
//   }
// };

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  // verifyRefreshToken,
};
