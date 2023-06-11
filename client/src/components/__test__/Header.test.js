import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

//this test case validates the header
describe("Header", () => {
  it("renders logo image correctly", () => {
    const { getByAltText } = render(<Header />);
    expect(getByAltText("Logo")).toBeInTheDocument();
  });
});
