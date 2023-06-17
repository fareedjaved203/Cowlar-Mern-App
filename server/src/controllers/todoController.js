const todoServices = require("../services/todoServices");

//a function to get all the data stored in db
async function getAllTodoItems(req, res, next) {
  try {
    const todos = await todoServices.getTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
//function to post data to db
async function createTodoItem(req, res, next) {
  try {
    const task = req.body.inputValue;
    const newTodo = await todoServices.createTodo(task);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

//function to update the status of the item/task
async function updateTodoItem(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTodo = await todoServices.updateTodo(id, status);
    res.status(204).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

//function to delete an item
async function deleteTodoItem(req, res, next) {
  try {
    const { id } = req.params;
    await todoServices.deleteTodo(id);
    res.status(204).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllTodoItems,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
};
