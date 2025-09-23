class ProfilePage {
  uploadCV(fileName) {
    cy.get('button.btn-profile-build-options:contains("Upload your CV")').click();
    cy.get('input[accept=".pdf, .doc, .docx"]').attachFile(fileName);
  }
  updateProfileType(name = 'new candidate') {
    cy.get('div.card-body div input').should('be.visible').type('new candidate');
    cy.get('li:contains("new candidate")').should('be.visible').click();
    cy.get('div.card-body button:contains("Continue")')
      .should('be.visible').click();
  }
  fillDetails() {
    cy.get('#description').type('I am a QA Engineer...');
    cy.get('#SharedPhoneControlRef--0---0-0-phone_number').clear().type('+92 3001234567');
    cy.get('label:contains("Date of birth")').click({ force: true }); // open date picker
    cy.get('input#date-picker-dialog--0---0-0-undefined').type('1995-07-14');
    cy.get('#gender').click().type('Male{enter}');
    cy.get('#nationality').click().type('Pakistani{enter}');
    cy.get('#salutation_uuid').click().type('mss{enter}');
    cy.get('#national_id').type('35202-1234567-8');
    cy.get('#address').type('123 Street, Lahore');
    cy.get('#city').first().type('Lahore');
    cy.get('#city').last().type('54000');
    cy.get('#location\\.country_uuid').click().type('Saudi Arabia{enter}');
    cy.get('#right_to_work\\.country_uuid').click().type('Saudi Arabia{enter}');
    cy.get('#SharedAPIAutocompleteControl-right_to_work-0---0-0-document_type')
      .click().type('National ID{enter}');
    cy.get('#job_types').click().type('Full-time{enter}');
  }

  submitProfile() {
    cy.get('button span:contains("Submit profile and apply")').scrollIntoView().click();
  }
}

export const profilePage = new ProfilePage();
