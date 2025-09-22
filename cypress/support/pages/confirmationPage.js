class ConfirmationPage {
  validateAndConfirm() {
    cy.get('.dialog-title-text').should('contain.text', 'Confirmations Message');
    cy.get('.dialog-content-wrapper')
      .should('contain.text', 'Please confirm that the information you have provided is accurate');
    cy.get('button.save-btn-wrapper').should('be.visible').click();
  }
}

export const confirmationPage = new ConfirmationPage();
