require("../db/conn");
const Todo = require("../model/todoSchema");
const User = require("../model/userSchema");

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
    const saveTodo = await todo.save();
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
    if (!todo) {
      console.log("Id not Found");
    }
    todo.status = status;
    todo.completionTime = completionTime;
    await todo.save();
    console.log("Successfully Updated");
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

const getUser = (req, res) => {
  res.send("User Page");
};

const postUser = async (req, res) => {
  const { name, email, password, profilePic } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
      profilePic,
    });
    const userAdded = await user.save();
    if (!userAdded) {
      return res.json({ message: "User Not Created" });
    } else {
      const findAddedUser = await User.findOne({ email });
      console.log(findAddedUser);
      const todo = new Todo({ user: 2 });
      const referUserToTodoList = await todo.save();
      console.log(referUserToTodoList);
      return res.status(201).json({ message: "User Saved Successfully" });
    }
  } catch (error) {
    res.status(501).json({ message: "User Not Created" });
  }
};

module.exports = {
  getData,
  postData,
  updateData,
  removeData,
  getUser,
  postUser,
};
