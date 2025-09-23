// Import Page Object Models (POMs) for modular and reusable test actions
import { registrationPage } from "../support/pages/registrationPage";
import { emailPage } from "../support/pages/emailPage";
import { profilePage } from "../support/pages/profilePage";
import { confirmationPage } from "../support/pages/confirmationPage";
import { jobVerify } from "../support/pages/jobVerify";

// 🔑 Utility function to generate a unique candidate email/UID
function generateUID() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  const randomNumber = Math.floor(100 + Math.random() * 900); // always 3 digits
  return randomLetter + randomNumber;
}

// Fetch environment variables (set in cypress.config.js or CI/CD)
const serverId = Cypress.env('MAILOSAUR_SERVER_ID');
const apiKey = Cypress.env('MAILOSAUR_API_KEY');

describe('Candidate Registration & Apply', () => {

  before(() => {
    // Runs once before all tests
    // Create a dynamic test email and store in localStorage
    localStorage.setItem('testEmail', `bilal-${generateUID()}@${serverId}.mailosaur.net`);
    cy.runRoutes(); // Setup network intercepts
  });

  it('Registers, verifies email, builds profile & applies', () => {
    const password = 'Password@123';
    let testEmail = localStorage.getItem('testEmail');

    // 🌐 Visit the app's root page
    cy.visit('/');

    // ✅ Step 1: Register Candidate
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

    // 📩 Step 2: Fetch Confirmation Email via Mailosaur
    emailPage.verifyConfirmationLink({ apiKey, serverId, testEmail });

    // Select candidate type → "new candidate"
    profilePage.updateProfileType('new candidate');

    // 📂 Step 3: Upload Resume (Note: fails due to Elevatus 500 error)
    profilePage.uploadCV('testResume.doc');

    // 🌐 Step 4: Open Material Coordinator Job page
    cy.visit('/jobs/material-coordinator-1758443998');

    // Click on "Apply" button
    cy.get('button[type="button"] span:contains("Apply")')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // 📝 Step 5: Fill Profile Details
    profilePage.fillDetails();
    profilePage.submitProfile();

    // ✅ Step 6: Validate Confirmation Modal
    confirmationPage.validateAndConfirm();

    // 🔎 Step 7: Verify "Applied" Status
    cy.get('button[type="button"] span:contains("Applied")')
      .should('be.visible');
      
    // 🔍 Step 8: Verify candidate exists in Jed Portal job list
    jobVerify(testEmail);
  });
});
