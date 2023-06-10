const todoServices = require("../services/todoServices");

async function getAllTodoItems(req, res, next) {
  try {
    const todos = await todoServices.getTodos();
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

async function createTodoItem(req, res, next) {
  try {
    const task = req.body.inputValue;
    const newTodo = await todoServices.createTodo(task);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
}

async function updateTodoItem(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTodo = await todoServices.updateTodo(id, status);
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
}

async function deleteTodoItem(req, res, next) {
  try {
    const { id } = req.params;
    await todoServices.deleteTodo(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTodoItems,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
};
