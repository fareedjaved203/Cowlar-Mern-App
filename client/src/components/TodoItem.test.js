import React from "react";
import { render, cleanup, queryByText } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
import TodoItem from "./TodoItem";

afterEach(cleanup);

test("renders todo item correctly", () => {
  const todo = {
    _id: "1",
    task: "Walking",
    status: "pending",
    startTime: "2023-05-22",
    completionTime: "2023-05-23",
  };

  // Render the TodoItem component
  const { container, queryByText } = render(
    <TodoItem
      value={todo}
      toggleAccordion={() => {}}
      handleIconToggle={() => {}}
      removeTodo={() => {}}
      isOpen={false}
      confirmId=""
    />
  );

  // Assert that the todo item is rendered with the correct task
  const taskElement = queryByText("Walking");
  expect(taskElement).toBeInTheDocument();

  // Log the rendered content for debugging
  console.log(container.innerHTML);

  // Assert that the todo item is rendered with the correct status
  const statusElement = queryByText(/pending/i); // Case-insensitive match using a regex
  expect(statusElement).toBeInTheDocument();

  // Simulate a click on the todo item
  // ...
});
