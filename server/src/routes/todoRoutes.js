const express = require("express");
const router = express.Router();
const cors = require("cors");

const todoController = require("../controllers/todoController");

router.use(cors());

router.post("/", todoController.createTodoItem);
router.get("/", todoController.getAllTodoItems);
router.put("/:id", todoController.updateTodoItem);
router.delete("/:id", todoController.deleteTodoItem);

module.exports = router;
