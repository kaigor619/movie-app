import { render, screen } from "@testing-library/react";
import { Overlay } from "./Overlay";

it("Overlay component", () => {
  render(<Overlay />);

  expect(screen.getByRole("img")).toBeInTheDocument();
});
