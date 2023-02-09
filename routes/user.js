const express = require("express");
const User = require("../models/User");
const Auth = require("../middleware/auth");
const userController = require("../controllers/UserController");
const router = new express.Router();

//register user
router.post("/users", userController.registerUser);

//log user
router.post("/users/login", userController.logUser);

//logout user
router.post("/users/logout", Auth, userController.logoutUser);

module.exports = router;
