const STAGE_URL = 'http://localhost:3000/'; // TODO: Use https://garibaldi-artchive-staging.herokuapp.com/ for PRs
const HerokuVisitTimeout = 60000 * 5;

// Assumes this one is already created.
const defaultTestUser = {
    username: 'lucechal_@hotmail.com',
    password: 'lucechal'
}

export const loginForTest = (cy, user = defaultTestUser) => {
    cy.visit(STAGE_URL, { timeout: HerokuVisitTimeout })

    cy.get('#username')
        .type(user.username)
        .should('have.value', user.username)

    cy.get('#password')
        .type(user.password)
        .should('have.value', user.password)

    cy.get('div.loginBtn').click()
}
