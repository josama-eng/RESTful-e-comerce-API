const mongoose = require("mongoose");

const ObjectID = mongoose.Schema.Types.ObjectID;

const itemSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectID,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [String],
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Item || mongoose.model("Item", itemSchema);
