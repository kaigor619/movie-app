import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddNewMovieForm } from "../AddNewMovieForm";
import { wrapper } from "mocks/wrapper";

describe("AddNewMovieFor component", () => {
  let onSubmit = jest.fn();

  const file = new File([""], "image.png", {
    type: "text/plain",
    lastModified: Date.now(),
  });

  const mockMovie = {
    title: "Avatar",
    rating: "9",
    file,
    genres: "thriller, fantasy",
  };

  beforeEach(() => {
    onSubmit.mockClear();
  });

  it("props isLoading equal true", async () => {
    render(<AddNewMovieForm isLoading={true} onSubmit={onSubmit} />, {
      wrapper,
    });

    expect(screen.getByRole("button")).toHaveTextContent("Saving...");
  });

  it("button is disabled if some of the fields are not valid", async () => {
    render(<AddNewMovieForm isLoading={false} onSubmit={onSubmit} />, {
      wrapper,
    });

    await userEvent.type(screen.getByLabelText("Title"), mockMovie.title);
    expect(screen.getByText(/Save/i)).toBeDisabled();

    await userEvent.type(screen.getByLabelText("Genres"), mockMovie.genres);
    expect(screen.getByText(/Save/i)).toBeDisabled();

    await userEvent.type(screen.getByLabelText("Rating"), mockMovie.rating);
    expect(screen.getByText(/Save/i)).toBeDisabled();

    await userEvent.upload(screen.getByTestId("input-file"), mockMovie.file);
    expect(screen.getByText(/Save/i)).not.toBeDisabled();
  });

  it("onSubmit fires when all fields are filled", async () => {
    render(<AddNewMovieForm isLoading={false} onSubmit={onSubmit} />, {
      wrapper,
    });

    await userEvent.type(screen.getByLabelText("Title"), mockMovie.title);
    await userEvent.type(screen.getByLabelText("Genres"), mockMovie.genres);
    await userEvent.type(screen.getByLabelText("Rating"), mockMovie.rating);
    await userEvent.upload(screen.getByTestId("input-file"), mockMovie.file);

    await userEvent.click(screen.getByText(/Save/i));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Avatar",
      rating: 9,
      file,
      genres: ["thriller", "fantasy"],
    });
  });
});
