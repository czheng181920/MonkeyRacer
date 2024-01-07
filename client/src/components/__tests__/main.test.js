import { render, screen, act, fireEvent } from "@testing-library/react";
import Main from "../Main";

describe("renders main component correctly", () => {
  it("renders the label", () => {
    const { getByText } = render(<Main />)
    const label = screen.getByText("welcome to monkeyracer");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("label");
  });

  it("renders the join game button", () => {
    const { getByText } = render(<Main />)
    const button = screen.getByText("join game");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button");
  });

  it("renders the create game button", () => {
    const { getByText } = render(<Main />)
    const button = screen.getByText("create game");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button");
  })
})