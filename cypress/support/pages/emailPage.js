class EmailPage {
  verifyConfirmationLink({ apiKey, serverId, testEmail }) {
    cy.task("getMailosaurEmail", { apiKey, serverId, testEmail }).then((email) => {
      cy.log("Email subject:", email.subject);
      cy.visit(email.html.links[0].href);
    });
  }
}

export const emailPage = new EmailPage();
