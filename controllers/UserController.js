const User = require("../models/User");

//register user
async function registerUser(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
}

//login user
async function logUser(req, res) {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
    console.log({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

//logout user
async function logoutUser(req, res) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("ok");
  } catch (error) {
    res.status(500).send();
  }
}

module.exports = {
  registerUser,
  logUser,
  logoutUser,
};
