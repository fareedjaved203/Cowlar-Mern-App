import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoItem from "../TodoItem";

describe("TodoItem", () => {
  it("renders task text correctly", () => {
    const value = { _id: "test-id", task: "test task" };
    const { getByText } = render(<TodoItem value={value} />);
    expect(getByText("test task")).toBeInTheDocument();
  });
});
describe("TodoItem", () => {
  it("calls handleIconToggle with correct argument when status icon is clicked", () => {
    const value = { _id: "test-id", status: "pending" };
    const handleIconToggle = jest.fn();
    const { getByTestId } = render(
      <TodoItem value={value} handleIconToggle={handleIconToggle} />
    );
    fireEvent.click(getByTestId("status-icon"));
    expect(handleIconToggle).toHaveBeenCalledWith("test-id");
  });
});
describe("TodoItem", () => {
  it("calls toggleAccordion with correct argument when task text is clicked", () => {
    const value = { _id: "test-id", task: "test task" };
    const toggleAccordion = jest.fn();
    const { getByTestId } = render(
      <TodoItem value={value} toggleAccordion={toggleAccordion} />
    );
    fireEvent.click(getByTestId("task-text"));
    expect(toggleAccordion).toHaveBeenCalledWith("test-id");
  });
});
