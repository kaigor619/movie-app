import popularMovies from "../../src/mocks/fixtures/popularMovies.json";
import { route } from "../../src/utils/route";
import { ROUTE_NAMES } from "../../src/routes";

describe("Popular scene", () => {
  beforeEach(() => cy.visit(route("popular")));

  it("click on movie card", () => {
    const selectedIndex = 0;

    const selectedMovie = popularMovies.results[selectedIndex];

    cy.findAllByTestId("movie-card").should(
      "have.length",
      popularMovies.results.length
    );

    cy.percySnapshot("Popular scene");

    cy.findAllByTestId("movie-card").eq(selectedIndex).find("h4").click();

    cy.location().should((loc) => {
      const expectedLocation = new URL(
        loc.origin +
          route("movieDetails", {
            route: { movieId: selectedMovie.id },
            query: { fromPage: ROUTE_NAMES.popular },
          })
      );

      expect(loc.pathname).to.eq(expectedLocation.pathname);
      expect(loc.search).to.eq(expectedLocation.search);
    });
  });

  it("click on load more button", () => {
    cy.findByTestId("load-more-btn").click();

    cy.findAllByTestId("movie-card").should(
      "have.length",
      popularMovies.results.length * 2
    );
  });
});
