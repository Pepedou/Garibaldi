import { loginForTest } from '../support/ui-actions'
import { deleteArtists } from '../commands/deleteArtist'

describe('Deletion Tests', () => {
    it('Deletes Artists', () => {
        loginForTest(cy);

        cy.get('.menu-item__artists').click();
        cy.url().should('contain', 'artists');

        deleteArtists(cy);
    });
});
