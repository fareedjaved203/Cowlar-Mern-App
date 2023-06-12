//here it is used to connect to database which is mongodb
const mongoose = require("mongoose");
const config = require("../config");
const DB = config.password;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
  });
