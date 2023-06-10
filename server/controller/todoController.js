require("../db/conn");
const Todo = require("../model/todoSchema");

const getData = async (req, res) => {
  try {
    const data = await Todo.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const postData = async (req, res) => {
  try {
    const task = req.body.inputValue;
    const todo = new Todo({ task });
    await todo.save();
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const completionTime = Date.now();
  try {
    const todo = await Todo.findById(id);
    if (todo) {
      todo.status = status;
      todo.completionTime = completionTime;
      await todo.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const removeData = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).json({ error: "Not Found" });
    }
    return res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(501).json({ error: "Cannot Delete" });
  }
};

module.exports = {
  getData,
  postData,
  updateData,
  removeData,
};
