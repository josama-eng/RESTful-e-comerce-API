const express = require("express");
const Cart = require("../models/cart");
const cartController = require("../controllers/CartController");
const Item = require("../models/item");
const Auth = require("../middleware/auth");

const router = new express.Router();

//get cart items
router.get("/cart", Auth, cartController.getCartItems);

//add cart
router.post("/cart", Auth, cartController.addCartItems);

//delete item in cart
router.delete("/cart/", Auth, cartController.deleteCartItem);

module.exports = router;
