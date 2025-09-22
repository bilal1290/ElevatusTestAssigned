import { registrationPage } from "../support/pages/registrationPage";
import { emailPage } from "../support/pages/emailPage";
import { profilePage } from "../support/pages/profilePage";
import { confirmationPage } from "../support/pages/confirmationPage";
import { jobVerify } from "../support/pages/jobVerify";
function generateUID() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  const randomNumber = Math.floor(100 + Math.random() * 900); // always 3 digits
  return randomLetter + randomNumber;
}

const serverId = Cypress.env('MAILOSAUR_SERVER_ID');
const apiKey = Cypress.env('MAILOSAUR_API_KEY');

describe('Candidate Registration & Apply', () => {
  before(() => {
    // runs once before all tests in the block
    // cy.log(`Using test email: bilal-${generateUID()}@${serverId}.mailosaur.net`);
    localStorage.setItem('testEmail', `bilal-${generateUID()}@${serverId}.mailosaur.net`);
  });
  it('Registers, verifies email, builds profile & applies', () => {
    const password = 'Password@123';
    let testEmail = localStorage.getItem('testEmail');
    cy.visit('/');

    registrationPage.acceptCookies();
    registrationPage.openRegisterForm();
    registrationPage.fillForm({
      firstName: 'Bilal',
      lastName: 'Hussain',
      email: testEmail,
      password,
      phone: '3001234567'
    });
    registrationPage.submit();
    registrationPage.validateSuccess();

    // 📩 fetch confirmation email
    emailPage.verifyConfirmationLink({ apiKey, serverId, testEmail })
    cy.get('div.card-body div input').should('be.visible').type('new candidate')
    cy.get('li:contains("new candidate")').should('be.visible').click()
    cy.get('div.card-body button:contains("Continue")')
      .should('be.visible').click()

    // Upload CV (Upload failling due to 500 error on Elevatus side)
    profilePage.uploadCV('testResume.doc');

    cy.visit('/jobs/material-coordinator-1758443998')


    cy.get('button[type="button"] span:contains("Apply")').scrollIntoView().should('be.visible').click()

    // Fill profile
    profilePage.fillDetails();
    profilePage.submitProfile();

    // Validate confirmation modal
    confirmationPage.validateAndConfirm();

    // Verify applied status
    cy.get('button[type="button"] span:contains("Applied")')
      .should('be.visible');
      
    // Verify job applicant list to confirm application in JED Portal
    jobVerify(testEmail);


  })
});
