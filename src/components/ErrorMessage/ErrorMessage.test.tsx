import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage component", () => {
  it("applies default props correctly", () => {
    render(<ErrorMessage description="API doesn't work" />);
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
  it("shows props title and description", () => {
    const { asFragment } = render(
      <ErrorMessage title="My Error" description="API doesn't work" />
    );
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
    expect(screen.getByText(/API doesn't work/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("checks if the picture exists", () => {
    render(<ErrorMessage title="My Error" description="API doesn't work" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
