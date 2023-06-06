const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");

const port = process.env.PORT || 8000;
console.log(port);

require("./db/conn"); //importing db connection from db folder
require("./model/todoSchema"); //defined schema
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
    maxAge: 86400,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  })
);
app.use(express.json({ limit: "50mb" })); // Set maximum request body size, //a middleware to convert json data into js object, usually when posting data through postman

app.use(express.urlencoded({ extended: true }));

app.use(require("./router/todoRoutes")); //to link router file
app.use(require("./router/userRoutes")); //to link router file
app.listen(port);
