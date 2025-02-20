import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { kebabCaseToTitleCase } from "./helpers.js";

test("button click flow", () => {
  // render App
  render(<App />);

  // find the button
  const buttonElement = screen.getByRole("button", { name: /blue/i });

  // check initial color
  expect(buttonElement).toHaveClass("medium-violet-red");

  // click the button
  fireEvent.click(buttonElement);

  // check button text
  expect(buttonElement).toHaveTextContent(/red/i);

  // check the button color
  // expect(buttonElement).toHaveClass("blue");
  expect(buttonElement).toHaveStyle({ "background-color": "rgb(25, 25, 112)" });
});

test("checkbox flow", () => {
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkBoxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkBoxElement).not.toBeChecked();

  // disable button -> button gray -> enable button -> button is red
  fireEvent.click(checkBoxElement); // disable
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");
  fireEvent.click(checkBoxElement); // enable
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("medium-violet-red");

  // click button to change color -> disable button -> button is gray
  fireEvent.click(buttonElement);
  fireEvent.click(checkBoxElement); // disable
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // enable button -> button is blue
  fireEvent.click(checkBoxElement); // enable
  expect(buttonElement).toHaveStyle({ "background-color": "rgb(25, 25, 112)" });
});

describe("kebabCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphens", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
