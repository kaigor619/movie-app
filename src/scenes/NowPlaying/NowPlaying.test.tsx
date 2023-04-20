import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import nowPlayingMovies from "mocks/fixtures/nowPlayingMovies.json";
import { server } from "mocks/server";
import { wrapper } from "mocks/wrapper";
import { NowPlaying } from "./NowPlaying";

describe("NowPlaying scene", () => {
  test("renders NowPlaying", async () => {
    render(<NowPlaying />, { wrapper });

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getAllByTestId("movie-card")).toHaveLength(
        nowPlayingMovies.results.length
      )
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
