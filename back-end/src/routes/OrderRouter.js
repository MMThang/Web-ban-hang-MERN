const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { userAuthMiddleware } = require("../middleware/authMiddleware");

router.post("/create-order", userAuthMiddleware, OrderController.createOrder);
router.get("/get-order/:id", userAuthMiddleware, OrderController.getOrder);
router.get("/my-order/:id", userAuthMiddleware, OrderController.getUserOrder);

module.exports = router;
