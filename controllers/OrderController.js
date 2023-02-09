const Cart = require("../models/Cart");
const User = require("../models/User");
const Order = require("../models/Order");

//checkout
async function checkout(req, res) {
  try {
    const owner = req.user._id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let street = req.body.street;
    let city = req.body.city;
    let state = req.body.state;
    let zip = req.body.zip;
    let phone = req.body.phone;
    let cart = await Cart.findOne({ owner });
    console.log(street);
    let user = req.user;
    if (cart) {
      const order = await Order.create({
        owner,
        items: cart.items,
        bill: cart.bill,
        firstName: firstName,
        lastName: lastName,
        street: street,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
      });
      //delete cart
      const data = await Cart.findByIdAndDelete({ _id: cart.id });
      return res.status(201).send({ status: "Payment successful", order });
    } else {
      res.status(400).send("No cart found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("invalid request");
  }
}

//get orders
async function getOrders(req, res) {
  const owner = req.user._id;
  try {
    const order = await Order.find({ owner: owner }).sort({ date: -1 });
    if (order) {
      return res.status(200).send(order);
    }
    res.status(404).send("No orders found");
  } catch (error) {
    res.status(500).send();
  }
}

module.exports = {
  checkout,
  getOrders,
};
