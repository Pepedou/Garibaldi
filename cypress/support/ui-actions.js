// Assumes this one is already created.
const defaultTestUser = {
    username: 'lucechal_@hotmail.com',
    password: 'lucechal',
    id: '5a5ec3edd0d9ab0004fd0d5b'
}

export const testArtist = {
    username: 'correo@mail.com',
    password: 'ABC123',
    name: 'Nombre',
    lastName: 'Artistico',
    nickname: 'Genial',
    age: '29',
    nationality: 'Mexico',
    profession: 'Artista',
    piece: 'Pieza',
    education: 'Universidad',
    exhibitions: 'Muchas.',
    birthDate: '28-Feb-2017',
    address1: 'Direccion 1',
    address2: 'Direccion 2',
    city: 'Mexico',
    state: 'Mexico',
    country: 'Mexico'
};

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

export const logout = (cy) => {
    cy.get('.icon-menu__button').click()
    cy.get('.icon-menu__logout').click()
}
