// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("scrollUntilVisible", (selector, maxScrolls = 10) => {
  let attempts = 0;

  function scroll() {
    attempts++;
    cy.get("body").then(($body) => {
      if ($body.find(selector).length > 0) {
        // 🎯 Element found
        cy.get(selector).scrollIntoView().should("be.visible");
      } else if (attempts < maxScrolls) {
        // ⬇️ Scroll more and retry
        cy.scrollTo("bottom");
        cy.wait(1000); // give time for lazy load
        scroll();
      } else {
        throw new Error(`Element ${selector} not found after ${maxScrolls} scrolls`);
      }
    });
  }

  scroll();
});
Cypress.Commands.add('runRoutes', (candidateName = 'new candidate') => {
  // Intercept API call triggered when selecting candidate
  cy.intercept('POST', 'https://dammam-core-api.elevatus.io/api/candidate/v1/register').as('createCandidate');

  
});