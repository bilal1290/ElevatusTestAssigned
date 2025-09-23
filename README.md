# 🚀 Elevatus New Candidate Automation (Cypress)

This repository contains Cypress automated test scripts for the following client requirement:

> **Task**  
> 1. Register a new candidate.  
> 2. Apply the candidate to the **Material Coordinator Job** → [Job Link](https://automationszaid.elevatus.io/jobs/material-coordinator-1758443998).  
> 3. After registration, ensure the candidate is added under the **"New Candidate" category** before applying.  
> 4. Login to **Jed Portal** → [Jed Portal Link](https://jed-portal.elevatus.io/).  
> 5. Navigate to **EVA-REC → Active Jobs**.  
> 6. Locate the job and confirm that the newly created candidate exists under it.  

---

## 📂 Repository Structure

── cypress
│   ├── e2e
│   │   └── newCandidate.cy.js      # Main test spec
│   ├── fixtures                    # Test data (optional)
│   └── support
│       ├── commands.js             # Custom Cypress commands
│       └── pages                   # Page Object Models (POM)
│           ├── registrationPage.js
│           ├── loginPage.js
│           ├── jobPage.js
│           └── portalPage.js
├── package.json
├── cypress.config.js
└── README.md



---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or later recommended)  
- [npm](https://www.npmjs.com/) (comes with Node.js)  
- [Cypress](https://www.cypress.io/)  

---
## CaseStudy Link:
https://docs.google.com/document/d/18hjIfD1mZ2AzZ2zL300jeAG2vfL1oEIs40vPfESjdKw/edit?usp=sharing

## Video Link working code and running test
- Video Link: https://www.loom.com/share/b1c4f3621ba1454986ea3397723a8d2a

## 📦 Installation

Clone the repository and install dependencies:

```bash
# Clone repo
git clone https://github.com/bilal1290/ElevatusTestAssigned.git
cd ElevatusTestAssigned

# Install dependencies
npm install

# Run test using
npx cypress open

npx cypress run --spec "cypress/e2e/jobApplicationTest.cy.js"

