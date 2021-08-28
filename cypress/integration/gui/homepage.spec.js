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

	it("displays the getting started button", () => {
		// assert:
		cy.get(".getStartedButton").should("have.text", "Get started");
	});

	it("takes user to login page", () => {
		// action:
		cy.get(".getStartedButton").click();

		// assert:
		cy.get(".login-group").should("exist");
	});
});
