const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const todoServices = require("../../services/todoServices");
const {
  getAllTodoItems,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
} = require("../../controllers/todoController");

jest.mock("../../services/todoServices");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.get("/todos", getAllTodoItems);
app.post("/todos", createTodoItem);
app.put("/todos/:id", updateTodoItem);
app.delete("/todos/:id", deleteTodoItem);

describe("getAllTodoItems", () => {
  it("returns all todo items", async () => {
    const todos = [{ task: "test todo" }];
    todoServices.getTodos.mockResolvedValue(todos);
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(todos);
  });
});

describe("createTodoItem", () => {
  it("creates a new todo item", async () => {
    const todoData = { inputValue: "test todo" };
    const newTodo = { task: "test todo" };
    todoServices.createTodo.mockResolvedValue(newTodo);
    const res = await request(app).post("/todos").send(todoData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newTodo);
  });
});

describe("updateTodoItem", () => {
  it("updates a todo item", async () => {
    const todoData = { status: "completed" };
    const updatedTodo = { task: "test todo", status: "completed" };
    todoServices.updateTodo.mockResolvedValue(updatedTodo);
    const res = await request(app).put("/todos/1").send(todoData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(updatedTodo);
  });
});

describe("deleteTodoItem", () => {
  it("deletes a todo item", async () => {
    todoServices.deleteTodo.mockResolvedValue();
    const res = await request(app).delete("/todos/1");
    expect(res.statusCode).toBe(204);
  });
});
