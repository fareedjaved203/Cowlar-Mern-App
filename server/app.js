const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();
require("./db/conn");

const port = process.env.PORT || 8000;
const api = process.env.API;

require("./db/conn"); //importing db connection from db folder
require("./model/todoSchema"); //defined schema
app.use(compression());
app.use(
  cors({
    origin: api,
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
app.listen(port);
