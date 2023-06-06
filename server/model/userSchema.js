const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "https://picsum.photos/200",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//password hashing
user.pre("save", async function (next) {
  if (this.isModified("password")) {
    //this will be executed whenever password is modified
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//generate token
user.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY); //generate token
    this.tokens = this.tokens.concat({ token: token }); //add token
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", user);

module.exports = User;
