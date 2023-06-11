const Todo = require("../model/todoSchema");

//db connection to get all items
async function getTodos() {
  try {
    const data = await Todo.find();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//db connection to post items
async function createTodo(task) {
  try {
    const todo = new Todo({ task });
    await todo.save();
    return todo;
  } catch (error) {
    console.log(error);
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
    }
  } catch (error) {
    console.log(error);
  }
}

//db connection to delete items
async function deleteTodo(id) {
  try {
    const todo = await Todo.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
