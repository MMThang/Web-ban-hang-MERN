const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const JwtService = require("./JwtService");

const createUserService = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, comfirmPassword } = newUser;
    try {
      const checkUser = await User.findOne({
        email,
      });

      if (checkUser !== null) {
        reject({
          status: "email replica ERR",
          message: "user is already existed",
        });
      }
      const hash = await bcrypt.hash(password, 10);
      const comparePassword = await bcrypt.compare(comfirmPassword, hash);
      if (!comparePassword) {
        reject({
          status: "comfirm password ERR",
          message: "password is not equal to comfirm password",
        });
      }
      const createUser = await User.create({
        name,
        email,
        password: hash,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createUser,
        });
      } else {
        reject({
          status: "create user ERR",
          message: "create user failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginUserService = (user) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = user;
    try {
      const checkUser = await User.findOne({
        email,
      });

      if (checkUser === null) {
        reject({
          status: "user not found ERR",
          message: "user is not existed",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        reject({
          status: "login ERR",
          message: "password or email is incorrect",
        });
      }
      const access_token = JwtService.genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      // const refresh_token = JwtService.genneralRefreshToken({
      //   id: checkUser.id,
      //   isAdmin: checkUser.isAdmin,
      // });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        // refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUserService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();

      if (users) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: users,
        });
      } else {
        reject({
          status: "get all user ERR",
          message: "cannot get all user",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getOneUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.findOne({
        _id: userId,
      });

      if (users) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: users,
        });
      } else {
        reject({
          status: "get one user ERR",
          message: "cannot get one user",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserService = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });

      if (checkUser === null) {
        reject({
          status: "user not found ERR",
          message: "user is not existed",
        });
      }

      const updateUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });

      if (updateUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: updateUser,
        });
      } else {
        reject({
          status: "update user ERR",
          message: "update user failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });

      if (checkUser === null) {
        reject({
          status: "user not found ERR",
          message: "user is not existed",
        });
      }

      const deleteUser = await User.findByIdAndDelete(userId);

      if (deleteUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: deleteUser,
        });
      } else {
        reject({
          status: "delete user ERR",
          message: "delete user failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUserService,
  loginUserService,
  getAllUserService,
  getOneUserService,
  updateUserService,
  deleteUserService,
};
