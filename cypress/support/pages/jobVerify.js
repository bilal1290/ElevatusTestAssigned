export function jobVerify(testEmail) {
  // Now move to 2nd domain using cy.origin()
  cy.origin('https://jed-portal.elevatus.io', { args: { testEmail } }, ({ testEmail }) => {
    // Inside this block, Cypress runs commands in the context of the 2nd domain
    cy.visit('/'); // relative to https://jed-portal.elevatus.io\
    // Fill Email
    cy.get('input[placeholder="Email"]').should('be.visible').click().type("z.lafi+elevatustest@elevatus.io");

    // Fill Password
    cy.get('input[placeholder="Password"]').should('be.visible').type("Zaid123123%%");

    // // Click Remember Me
    // cy.get('#rememberMeLoginRef input[type="checkbox"]').should('be.visible')

    // Submit
    cy.get('button[type="submit"]').should('be.visible').click({ force: true });

    cy.get('a#job_board').should('be.visible').click({ force: true });

    cy.get('li a.tab-link:contains("Active Jobs")').should('be.visible').click();

    cy.get('tbody tr td span[aria-label="new candidate automation"]').should('be.visible').click();
    cy.get('input[placeholder="Search..."]').should('be.visible').click().type(testEmail + '{enter}');
    cy.get(`.stage-candidates-section-wrapper .card-content-wrapper .card-body-wrapper .body-item-wrapper span:contains("${testEmail}")`).scrollIntoView().should('be.visible').click();


    // Validate candidate details
    cy.get('.candidate-personal-info-wrppaer span')
      .should('contain.text', 'Personal Info');

    // Salutation
    cy.contains('.h7.text-gray', 'Salutation')
      .should('contain.text', 'mss');

    // Name (notice there’s whitespace / line breaks, so use regex or trim)
    cy.contains('.h7.text-gray', 'Name')
      .invoke('text')
      .then(text => {
        expect(text.replace(/\s+/g, ' ').trim()).to.eq('NameBilal Hussain');
      });

    // Phone Number
    cy.contains('.h7.text-gray', 'Phone Number')
      .should('contain.text', '929230012345');

    // DOB
    cy.contains('.h7.text-gray', 'Date of birth')
      .should('contain.text', '7/14/1995');

    // Gender
    cy.contains('.h7.text-gray', 'Gender')
      .should('contain.text', 'Female');

    // Nationality
    cy.contains('.h7.text-gray', 'Nationality')
      .should('contain.text', 'Pakistani');

    // National ID
    cy.contains('.h7.text-gray', 'National ID')
      .should('contain.text', '35202-1234567-8');

    // Address
    cy.contains('.h7.text-gray', 'Address')
      .should('contain.text', '123 Street, Lahore');

    // Email
    cy.contains('.h7.text-gray', 'Email')
      .should('contain.text', testEmail);

    // ZIP code (empty in your DOM, so assert blank)
    cy.contains('.h7.text-gray', 'ZIP code')
      .invoke('text')
      .then(text => {
        expect(text.replace('ZIP code', '').trim()).to.eq('');
      });

  });

}