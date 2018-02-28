import { loginForTest, logout, testArtist } from '../support/ui-actions'
import { createNewUser } from '../commands/createNewUser'
import { createNewArtist } from '../commands/createNewArtist'
import { createNewArt } from '../commands/createNewArt'

const EMAIL = 'newArtist@correo.com'
let newArtist = Object.assign(testArtist, {username: EMAIL});
let newUser = Object.assign(testArtist, {username: EMAIL, name: 'Laura'});

describe('Bug Fixing', () => {
    it('addresses bug GAR#97', () => {
        cy.goHome();

        loginForTest(cy);

        cy.get('.menu-item__artists').click()
        cy.get('.floating-action__add-button').click();
        createNewArtist(cy, newArtist);

        cy.get('.menu-item__file').click()
        cy.get('.floating-action__add-button').click();
        cy.wait(1000);
        createNewArt(cy);

        logout(cy);

        cy.get('#registerOption').click()
        createNewUser(cy, 'Artista', newUser);

        loginForTest(cy, {username: EMAIL, password: testArtist.password});

        cy.get('.grid-card:first div div:first div:last').should('contain', `Laura ${testArtist.lastName}`);
    })
})
