import { loginForTest } from '../support/ui-actions'
import { createNewArtist } from '../commands/createNewArtist'
import { createNewArt } from '../commands/createNewArt'
import { createNewUser } from '../commands/createNewUser'
import { createTemplate } from '../commands/createTemplate'

describe('Creation Tests', () => {
    it('Create new artist', () => {
        loginForTest(cy);

        cy.get('.menu-item__artists').click()
        cy.url().should('contain', 'artists');
        cy.get('.floating-action__add-button').click();
        cy.url().should('contain', 'newArtist');

        createNewArtist(cy)
    });

    it('Create new art', () => {
        loginForTest(cy);

        cy.get('.menu-item__file').click()
        cy.url().should('contain', 'home');
        cy.get('.floating-action__add-button').click();
        cy.url().should('contain', 'newArt');

        createNewArt(cy)
    });

    it('Create new user', () => {
        cy.get('#registerOption').click()
        cy.url().should('contain', 'register');

        createNewUser(cy)
    });

    it('Create new template', () => {
        loginForTest(cy);

        cy.get('.menu-item__templates').click()
        cy.url().should('contain', 'createTemplate');

        createTemplate(cy, 'Nuevo template')
    });
});
