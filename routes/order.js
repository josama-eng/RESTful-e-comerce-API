const express = require("express");

const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");
const orderController = require("../controllers/OrderController");
const Auth = require("../middleware/auth");

const router = new express.Router();

//checkout
router.post("/order/checkout", Auth, orderController.checkout);

//get orders
router.get("/orders", Auth, orderController.getOrders);

module.exports = router;
