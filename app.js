require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const itemRoute = require("./routes/item");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");
require("./db/connect");

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoute);
app.use(itemRoute);
app.use(cartRoute);
app.use(orderRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
