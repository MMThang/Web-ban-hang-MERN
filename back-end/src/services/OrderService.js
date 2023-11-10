const Order = require("../models/OrderModel");

const createOrderService = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      cart,
      name,
      gender,
      phone,
      city,
      district,
      ward,
      address,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      userId,
      note,
    } = newOrder;
    try {
      const createOrder = await Order.create({
        orderItems: cart,
        shippingAddress: {
          fullName: name,
          gender,
          phone,
          city,
          district,
          ward,
          address,
          note,
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: userId,
      });

      if (createOrder) {
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: createOrder,
        });
      }
    } catch (error) {
      return reject({
        status: "ERR",
        message: `${error}`,
      });
    }
  });
};

const getOrderService = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getOrder = await Order.findById(orderId);

      if (getOrder) {
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: getOrder,
        });
      } else {
        return reject({
          status: "find order ERR",
          message: "this order is not existed",
        });
      }
    } catch (error) {
      return reject({
        status: "ERR",
        message: `${error}`,
      });
    }
  });
};
const getUserOrderService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getOrder = await Order.find({ user: userId });

      if (getOrder) {
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: getOrder,
        });
      } else {
        return reject({
          status: "find user ERR",
          message: "this user is not existed",
        });
      }
    } catch (error) {
      return reject({
        status: "ERR",
        message: `${error}`,
      });
    }
  });
};

module.exports = {
  createOrderService,
  getOrderService,
  getUserOrderService,
};
