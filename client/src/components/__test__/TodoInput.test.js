import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoInput from "../TodoInput";

describe("TodoInput", () => {
  it("renders an input element", () => {
    const { getByTestId } = render(<TodoInput />);
    expect(getByTestId("Add Item")).toBeInTheDocument();
  });
});
describe("TodoInput", () => {
  it("calls toggleMode when FaExchangeAlt icon is clicked", () => {
    const toggleMode = jest.fn();
    const { getByTestId } = render(<TodoInput toggleMode={toggleMode} />);
    fireEvent.click(getByTestId("exchange-icon"));
    expect(toggleMode).toHaveBeenCalled();
  });
});
describe("TodoInput", () => {
  it("calls toggleVisibility when visibility icon is clicked", () => {
    const toggleVisibility = jest.fn();
    const { getByTestId } = render(
      <TodoInput toggleVisibility={toggleVisibility} />
    );
    fireEvent.click(getByTestId("visibility-icon"));
    expect(toggleVisibility).toHaveBeenCalled();
  });
});
