import { loginForTest, logout, testArtist } from '../support/ui-actions'
import { createNewUser } from '../commands/createNewUser'
import { deleteCards } from '../commands/deleteCards'

describe('Bug Fixing', () => {
    it('addresses bug GAR#99', () => {
        cy.goHome();

        cy.get('#registerOption').click()
        createNewUser(cy, 'Artista')

        loginForTest(cy);

        cy.get('.menu-item__artists').click()
        deleteCards(cy)
        cy.wait(1000)

        logout(cy);

        loginForTest(cy, {username: testArtist.username, password: testArtist.password})
        cy.wait(1000)

        cy.url().should('not.include', 'home');
    })
})
