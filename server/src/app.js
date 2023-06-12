const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();
require("../config/db");
const config = require("../config");

const port = config.port || 8000;
const api = config.Api;

require("./model/todoSchema"); //defined schema
//compression is used to compress the file size in browser which will help to make website faster
app.use(compression());

//cors is used to successfully passing or getting data from frontend with specifications
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

app.use(require("./routes/todoRoutes")); //to link router file
app.listen(port);
