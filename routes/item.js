const express = require("express");
const Item = require("../models/item");
const itemController = require("../controllers/ItemController");
const Auth = require("../middleware/auth");

const router = new express.Router();

//fetch all items
router.get("/items", itemController.getAllItems);

//fetch an item
router.get("/items/:id", itemController.getOneItem);

//create an item
router.post("/items", Auth, itemController.createItem);

//update an item
router.patch("/items/:id", Auth, itemController.updateItem);

//delete item
router.delete("/items/:id", Auth, itemController.deleteItem);

module.exports = router;
