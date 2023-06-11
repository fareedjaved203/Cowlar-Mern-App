const mongoose = require("mongoose");

//a required schema for the Cowlar todo list
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  completionTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
