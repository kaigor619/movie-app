import { MoviesDb } from "../../src/services/moviesDB";
import { REQUEST_TIMEOUTS } from "../../src/api/movieApi";

describe("Favorites scene", () => {
  beforeEach(() => {
    cy.visit("/favorites");
    MoviesDb.clean();
    cy.viewport(1280, 720);
  });

  afterEach(() => MoviesDb.clean());

  const mockData = {
    title: "Avatar",
    genre: "thriller, fantasy",
    rating: "9",
    file: "cypress/images/avatar-poster.jpeg",
  };

  it("show modal", () => {
    cy.percySnapshot("Favorites scene - loading");

    cy.findByText("Nothing was found").should("exist");

    cy.percySnapshot("Favorites scene - empty");

    cy.get('button[data-testid="add-movie"]').click();
    const form = cy.get('form[data-testid="add-new-movie"]');
    form.should("exist");
  });

  it("add new favorite movie", () => {
    cy.clock();

    cy.get('button[data-testid="add-movie"]').click();

    const form = cy.get('form[data-testid="add-new-movie"]');

    form.should("exist");

    form.get('input[name="title"]').type(mockData.title);
    form.get('input[name="genres"]').type(mockData.genre);
    form.get('input[name="rating"]').type(mockData.rating);

    form.get('input[name="file"]').selectFile(mockData.file, {
      force: true,
    });

    form.get("button").contains("Save").click();

    cy.tick(REQUEST_TIMEOUTS.addFavorite + REQUEST_TIMEOUTS.getFavorites);

    form.get("button").contains("Saving...");

    form.should("not.exist");

    cy.findAllByTestId("movie-card").should("have.length", 1);

    const addedMovieCard = cy.findAllByTestId("movie-card").eq(0);

    addedMovieCard.findByText("Avatar").should("exist");

    cy.findAllByTestId("movie-card")
      .eq(0)
      .findByRole("img")
      .should("be.visible")
      .and(($img) => {
        expect($img[0].clientHeight).to.be.greaterThan(0);
      });
    cy.percySnapshot("Favorites scene");
  });
});
