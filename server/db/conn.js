const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://fareedjaved203:9U6SaqlibdkUssVV@cluster0.vj7htrg.mongodb.net/Cowlar_TodoList?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
  });
