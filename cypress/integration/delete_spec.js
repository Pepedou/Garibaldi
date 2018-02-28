import { loginForTest } from '../support/ui-actions'
import { deleteCards } from '../commands/deleteCards'

describe('Deletion Tests', () => {
    it('Deletes Artists', () => {
        loginForTest(cy);

        cy.get('.menu-item__artists').click();
        cy.url().should('contain', 'artists');

        deleteCards(cy);
    });
});
