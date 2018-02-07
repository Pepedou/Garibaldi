import { loginForTest } from '../support/ui-actions'

describe('Garibaldi v1.0.0', () => {
    it('logins successfully', () => {

        loginForTest(cy);

        cy.url()
            .should('include', '/home')
    })
})
