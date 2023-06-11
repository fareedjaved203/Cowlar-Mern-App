const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const todoController = require("../../controllers/todoController");
const router = require("../../routes/todoRoutes");

jest.mock("../../controllers/todoController");

const app = express();
app.use(bodyParser.json());
app.use("/todos", router);

describe("POST /todos", () => {
  it("creates a new todo item", async () => {
    const todoData = { inputValue: "test todo" };
    const newTodo = { task: "test todo" };
    todoController.createTodoItem.mockImplementation((req, res) => {
      res.status(201).json(newTodo);
    });
    const res = await request(app).post("/todos").send(todoData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newTodo);
  });
});

describe("GET /todos", () => {
  it("returns all todo items", async () => {
    const todos = [{ task: "test todo" }];
    todoController.getAllTodoItems.mockImplementation((req, res) => {
      res.json(todos);
    });
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(todos);
  });
});

describe("PUT /todos/:id", () => {
  it("updates a todo item", async () => {
    const todoData = { status: "completed" };
    const updatedTodo = { task: "test todo", status: "completed" };
    todoController.updateTodoItem.mockImplementation((req, res) => {
      res.json(updatedTodo);
    });
    const res = await request(app).put("/todos/1").send(todoData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(updatedTodo);
  });
});

describe("DELETE /todos/:id", () => {
  it("deletes a todo item", async () => {
    todoController.deleteTodoItem.mockImplementation((req, res) => {
      res.sendStatus(204);
    });
    const res = await request(app).delete("/todos/1");
    expect(res.statusCode).toBe(204);
  });
});
