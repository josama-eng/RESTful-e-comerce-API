const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conn = require("../db/connect");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password musn't contain password");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// system to generate authentication tokens
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  console.log(token, user);
  await user.save();
  return token;
};

//login in users
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Unable to log in");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

//Hash plain password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
