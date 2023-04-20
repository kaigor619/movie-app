import nowPlayingMovies from "../../src/mocks/fixtures/nowPlayingMovies.json";
import { route } from "../../src/utils/route";
import { ROUTE_NAMES } from "../../src/routes";

describe("NowPlaying scene", () => {
  beforeEach(() => cy.visit("/"));

  it("click on movie card", () => {
    const selectedIndex = 0;

    const selectedMovie = nowPlayingMovies.results[selectedIndex];

    cy.findAllByTestId("movie-card").should(
      "have.length",
      nowPlayingMovies.results.length
    );

    cy.percySnapshot("NowPlaying scene");

    cy.findAllByTestId("movie-card").eq(selectedIndex).find("h4").click();

    cy.location().should((loc) => {
      const expectedLocation = new URL(
        loc.origin +
          route("movieDetails", {
            route: { movieId: selectedMovie.id },
            query: { fromPage: ROUTE_NAMES.nowPlaying },
          })
      );

      expect(loc.pathname).to.eq(expectedLocation.pathname);
      expect(loc.search).to.eq(expectedLocation.search);
    });
  });

  it("click on pagination", () => {
    cy.findByTestId("pagination").get("li").contains("2").click();

    cy.location().should((loc) => {
      const expectedLocation = new URL(
        loc.origin +
          route("nowPlaying", {
            route: { page: 2 },
          })
      );

      expect(loc.pathname).to.eq(expectedLocation.pathname);
    });
  });
});
