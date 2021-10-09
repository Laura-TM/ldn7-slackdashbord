/// <reference types="cypress" />

describe("SLacktastic Homepage", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("displays the homepage intro and correct title", () => {
		// assert:
		cy.title().should("eq", "Slacktastic");
		cy.get(".introMessage h1").should(
			"include.text",
			"CYF Slacktastic dashboard"
		);
	});

	it("contains three buttons", () => {
		// assert:
		cy.get(".buttonsContainer").eq(0).should("contain", "ADMIN");
		cy.get(".buttonsContainer").first().should("contain", "MENTOR");
		cy.get(".buttonsContainer").last().should("contain", "TRAINEE");
	});

	it("takes user to login page", () => {
		// action:
		cy.get(".buttonsContainer").first().click();

		// // assert:
		cy.get(".MuiButton-label").contains("Login");
	});
});
