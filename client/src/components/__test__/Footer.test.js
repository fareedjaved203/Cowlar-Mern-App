import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders footer text correctly", () => {
    const { getByText } = render(<Footer />);
    expect(
      getByText("© 2023, Muhammad Fareed Javed. All Rights Reserved")
    ).toBeInTheDocument();
  });
});
