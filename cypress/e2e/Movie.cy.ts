import nowPlayingMovies from "../../src/mocks/fixtures/nowPlayingMovies.json";
import { route } from "../../src/utils/route";
import movie from "../../src/mocks/fixtures/movie502356.json";
import { ROUTE_NAMES } from "../../src/routes";

describe("Movie scene", () => {
  const selectedIndex = 0;
  const selectedMovie = nowPlayingMovies.results[selectedIndex];

  it("make a screenshot", () => {
    cy.visit(
      route("movieDetails", {
        route: { movieId: selectedMovie.id },
        query: { fromPage: ROUTE_NAMES.nowPlaying },
      })
    );

    cy.get("h1").contains(movie.original_title).should("exist");

    cy.percySnapshot("Movie scene");
  });

  it("network error", () => {
    cy.visit(
      route("movieDetails", {
        route: { movieId: "fefrgr" },
        query: { fromPage: ROUTE_NAMES.nowPlaying },
      })
    );

    cy.findByTestId("error-message").should("exist");

    cy.percySnapshot("Movie scene - error");
  });

  it("return back to main page", () => {
    const page = 3;

    cy.visit(route("nowPlaying", { route: { page } }));

    cy.findAllByTestId("movie-card").eq(selectedIndex).find("h4").click();

    cy.findByTestId("go-back").click();

    cy.location().should((loc) => {
      const expectedLocation = new URL(
        loc.origin + route("nowPlaying", { route: { page } })
      );
      expect(loc.pathname).to.eq(expectedLocation.pathname);
      expect(loc.search).to.eq(expectedLocation.search);
    });
  });
});
