import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Counter from "./Counter";

describe("Counter", () => {
  it("should increment the counter when the Increment button is clicked", async () => {
    render(<Counter />);
    const incButton = screen.getByTitle("Increment");
    await userEvent.click(incButton);
    screen.getByText("The counter is currently 1");
    await userEvent.click(incButton);
    screen.getByText("The counter is currently 2");
  });

  it("should decrement the counter when the Decrement button is clicked", async () => {
    render(<Counter />);
    const decButton = screen.getByTitle("Decrement");
    await userEvent.click(decButton);
    screen.getByText("The counter is currently -1");
    await userEvent.click(decButton);
    screen.getByText("The counter is currently -2");
  });
});
