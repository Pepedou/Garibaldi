import {STAGE_URL} from '../support/commands'
import {testArtist} from '../support/ui-actions'

export const createNewUser = (cy, userType, user = testArtist) => {
    cy.get('#email').type(user.username)
    cy.get('#name').type(user.name)
    cy.get('#confirmEmail').type(user.username)
    cy.get('#lastName').type(user.lastName)
    cy.get('#password').type(user.password)
    cy.get('#confirmPassword').type(user.password)
    cy.get('#birthDate').type(user.birthDate)
    cy.get('#address1').type(user.address1)
    cy.get('#ownerType').select(userType);
    cy.get('#address2').type(user.address2)
    cy.get('#city').type(user.city)
    cy.get('#state').type(user.state)
    cy.get('#country').type(user.country)

    cy.get('.create-user-form__save').click()
    cy.wait(1000);
    cy.url().should('include', STAGE_URL);
}
