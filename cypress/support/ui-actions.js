// Assumes this one is already created.
const defaultTestUser = {
    username: 'lucechal_@hotmail.com',
    password: 'lucechal'
}

export const loginForTest = (cy, user = defaultTestUser) => {
    cy.goHome();

    cy.get('#username')
        .type(user.username)
        .should('have.value', user.username)

    cy.get('#password')
        .type(user.password)
        .should('have.value', user.password)

    cy.get('div.loginBtn').click()
}
