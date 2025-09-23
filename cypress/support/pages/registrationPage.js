class RegistrationPage {
  acceptCookies() {
    cy.get('div.cookie-drawer button:contains("I Accept Recommended Cookies")')
      .should('be.visible').click();
  }

  openRegisterForm() {
    cy.get('div.menu-auth-wrapper button span:contains("Register")')
      .should('be.visible').click();
  }

  fillForm({ firstName, lastName, email, password, phone }) {
    cy.get('input[name="firstName"]').type(firstName).should('have.value', firstName);
    cy.get('input[name="lastName"]').type(lastName).should('have.value', lastName);
    cy.get('input[name="email"]').type(email).should('have.value', email);
    cy.get('input[name="password"]').type(password).should('have.value', password);
    cy.get('input[name="confirmPassword"]').type(password).should('have.value', password);
    cy.get('input[type="tel"]').clear().type(phone);
    cy.get('label[for="customCheckLogin"] span').click();
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  validateSuccess() {
    // Wait for network call to complete
    cy.wait('@createCandidate').its('response.statusCode').should('eq', 200);
    cy.get('div.card-body .text-center')
      .should('contain.text', 'Registered successfully');
  }
}

export const registrationPage = new RegistrationPage();
