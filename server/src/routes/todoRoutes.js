const express = require("express");
const router = express.Router();
const cors = require("cors");

const todoController = require("../controllers/todoController");

//cors is used to successfully passing data from backend to frontend and vice versa
router.use(cors());

//routes that lead to the methods defined in controller
router.post("/", todoController.createTodoItem);
router.get("/", todoController.getAllTodoItems);
router.put("/:id", todoController.updateTodoItem);
router.delete("/:id", todoController.deleteTodoItem);

module.exports = router;
