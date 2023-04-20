import { AddNewMovieForm } from "./AddNewMovieForm";

describe("AddNewMovieForm component", () => {
  const mockData = {
    title: "Avatar",
    genre: "thriller, fantasy",
    rating: "9",
    file: {
      contents: Cypress.Buffer.from("file contents"),
      fileName: "image.jpeg",
      mimeType: "text/jpeg",
      lastModified: Date.now(),
    },
  };

  it("checks if button is disabled when some of the fields are invalid", () => {
    const onSubmit = cy.spy().as("onSubmit");
    cy.mount(<AddNewMovieForm isLoading={false} onSubmit={onSubmit} />);

    cy.findByLabelText(/Title/i).type(mockData.title);
    cy.findByText("Save").should("be.disabled");

    cy.findByLabelText(/Genres/i).type(mockData.genre);
    cy.findByText("Save").should("be.disabled");

    cy.findByLabelText(/Rating/).type(mockData.rating);
    cy.findByText("Save").should("be.disabled");

    cy.findByLabelText("Choose image").selectFile(mockData.file, {
      force: true,
    });

    cy.findByText("Save").should("not.be.disabled");

    cy.findByText("Save").click();
  });
  it("checks button is active for clicking", () => {
    const onSubmit = cy.spy().as("onSubmit");

    cy.mount(<AddNewMovieForm isLoading={false} onSubmit={onSubmit} />);

    cy.percySnapshot("AddNewMovieForm empty", { widths: [1280] });

    cy.findByLabelText(/Title/i).type(mockData.title);
    cy.findByLabelText(/Genres/i).type(mockData.genre);
    cy.findByLabelText(/Rating/).type(mockData.rating);

    cy.findByLabelText("Choose image").selectFile(mockData.file, {
      force: true,
    });

    cy.percySnapshot("AddNewMovieForm filled", { widths: [1280] });

    cy.findByText(/image.jpeg/i).should("exist");

    cy.findByText("Save").should("not.be.disabled");

    cy.findByText("Save").click();

    cy.get("@onSubmit").should("have.been.calledOnce");
  });
});
