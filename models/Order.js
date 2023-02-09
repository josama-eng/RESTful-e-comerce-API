const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectID,
      required: true,
      ref: "User",
    },
    cart: [
      {
        cartId: {
          type: ObjectID,
          ref: "Cart",
          required: true,
        },
      },
    ],
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
