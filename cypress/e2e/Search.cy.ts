import searchedMovies from "../../src/mocks/fixtures/searchedMovies.json";
import { route } from "../../src/utils/route";

describe("NowPlaying scene", () => {
  beforeEach(() => cy.visit("/"));

  it("redirects to search page if user types on search bar", () => {
    const searchedValue = "John";
    cy.findByTestId("search-movie").type(searchedValue);

    cy.location().should((loc) => {
      const expectedLocation = new URL(
        loc.origin +
          route("search", {
            query: { query: searchedValue },
          })
      );
      expect(loc.pathname).to.eq(expectedLocation.pathname);
      expect(loc.search).to.eq(expectedLocation.search);
    });

    cy.findByText(`Searched results: ${searchedValue}`).should("exist");

    cy.findAllByTestId("movie-card").should(
      "have.length",
      searchedMovies.results.length
    );
  });
  it("redirects back to search page if there no value in search bar", () => {
    const searchedValue = "John";
    cy.findByTestId("search-movie").type(searchedValue);

    cy.location().should((loc) => {
      const expectedLocation = new URL(
        loc.origin +
          route("search", {
            query: { query: searchedValue },
          })
      );
      expect(loc.pathname).to.eq(expectedLocation.pathname);
      expect(loc.search).to.eq(expectedLocation.search);
    });

    cy.findByText(`Searched results: ${searchedValue}`).should("exist");

    cy.findAllByTestId("movie-card").should(
      "have.length",
      searchedMovies.results.length
    );
  });
});
