import { loginForTest, logout } from '../support/ui-actions'
import {STAGE_URL} from '../support/commands'

describe('Garibaldi v1.0.0', () => {
    it('logins successfully', () => {
        loginForTest(cy);

        cy.url().should('include', '/home')
    });

    it('logout successfully', () => {
        logout(cy);

        cy.url().should('include', STAGE_URL)
    });
})
