import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieCard } from "./MovieCard";

describe("MovieCard component", () => {
  it("renders card with props", async () => {
    render(
      <MovieCard
        imageSrc={null}
        rating={9.7}
        title="Avatar"
        genres={["thriller", "fantasy"]}
      />
    );

    expect(screen.getByText(/9.7/i)).toBeInTheDocument();
    expect(screen.getByText(/Avatar/i)).toBeInTheDocument();
    expect(screen.getByText(/thriller, fantasy/i)).toBeInTheDocument();
  });

  it("onClick", async () => {
    const onClick = jest.fn();

    render(
      <MovieCard
        imageSrc="https://image.png"
        rating={9.7}
        title="Avatar"
        genres={["thriller", "fantasy"]}
        onClick={onClick}
      />
    );

    await userEvent.click(screen.getByText(/Avatar/i));
    expect(onClick).toHaveBeenCalledTimes(1);

    onClick.mockClear();

    await userEvent.click(screen.getByRole("img"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
