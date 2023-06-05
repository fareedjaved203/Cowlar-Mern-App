const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB_PASSWORD;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
  });
