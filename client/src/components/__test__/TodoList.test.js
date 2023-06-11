import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "../TodoList";

describe("TodoList", () => {
  it("renders list of TodoItem components", () => {
    const todos = [
      { _id: "test-id-1", task: "test task 1" },
      { _id: "test-id-2", task: "test task 2" },
      { _id: "test-id-3", task: "test task 3" },
    ];
    const { getByText } = render(<TodoList todos={todos} />);
    expect(getByText("test task 1")).toBeInTheDocument();
    expect(getByText("test task 2")).toBeInTheDocument();
    expect(getByText("test task 3")).toBeInTheDocument();
  });
});

describe("TodoList", () => {
  it("does not render list of TodoItem components when isHidden is true", () => {
    const todos = [
      { _id: "test-id-1", task: "test task 1" },
      { _id: "test-id-2", task: "test task 2" },
      { _id: "test-id-3", task: "test task 3" },
    ];
    const { queryByText } = render(<TodoList todos={todos} isHidden={true} />);
    expect(queryByText("test task 1")).not.toBeInTheDocument();
    expect(queryByText("test task 2")).not.toBeInTheDocument();
    expect(queryByText("test task 3")).not.toBeInTheDocument();
  });
});

describe("TodoList", () => {
  it("does not render list of TodoItem components when isHidden is true", () => {
    const todos = [
      { _id: "test-id-1", task: "test task 1" },
      { _id: "test-id-2", task: "test task 2" },
      { _id: "test-id-3", task: "test task 3" },
    ];
    const { queryByText } = render(<TodoList todos={todos} isHidden={true} />);
    expect(queryByText("test task 1")).not.toBeInTheDocument();
    expect(queryByText("test task 2")).not.toBeInTheDocument();
    expect(queryByText("test task 3")).not.toBeInTheDocument();
  });
});
