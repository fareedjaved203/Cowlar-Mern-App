const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const Todo = require("./model/todoSchema");

require("./db/conn"); //importing db connection from db folder
require("./model/todoSchema"); //defined schema
app.use(express.json()); //a middleware to convert json data into js object, usually when posting data through postman
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require("./router/todoRoutes")); //to link router file
app.listen(8000);
