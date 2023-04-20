import { render, screen } from "@testing-library/react";
import { EmptyMessage } from "./EmptyMessage";

describe("EmptyMessage component", () => {
  it("displays image and corresponding text", () => {
    const { asFragment } = render(<EmptyMessage />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/nothing was found/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
