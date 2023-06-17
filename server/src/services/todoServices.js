const Todo = require("../model/todoSchema");

//db connection to get all items
async function getTodos(req, res) {
  try {
    const data = await Todo.find();
    return data;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

//db connection to post items
async function createTodo(task) {
  try {
    const todo = new Todo({ task });
    await todo.save();
    return todo;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

//db connection to update items
async function updateTodo(id, status) {
  const completionTime = Date.now();
  try {
    const todo = await Todo.findById(id);
    if (todo) {
      todo.status = status;
      todo.completionTime = completionTime;
      await todo.save();
      return todo;
    } else {
      res.status(404).json({ message: "Id Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

//db connection to delete items
async function deleteTodo(id) {
  try {
    const todo = await Todo.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
