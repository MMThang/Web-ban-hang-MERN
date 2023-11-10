const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
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
    } = req.body;
    if (
      !cart ||
      !name ||
      !gender ||
      !phone ||
      !city ||
      !district ||
      !ward ||
      !address ||
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !userId
    ) {
      return res.status(400).json({
        status: "input ERR",
        message: "the input is required",
      });
    }
    const response = await OrderService.createOrderService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const response = await OrderService.getOrderService(orderId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getUserOrder = async (req, res) => {
  try {
    const userId = req.params.id;

    const response = await OrderService.getUserOrderService(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createOrder,
  getOrder,
  getUserOrder,
};
