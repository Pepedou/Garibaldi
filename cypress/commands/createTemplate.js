export const createTemplate = (cy, name, withMembrete = false) => {
    cy.get('#name').type(name)
    if(withMembrete) {
        cy.get('#template-option__noMembrete').check()
    } else {
        cy.get('#template-option__noMembrete').uncheck()
    }

    cy.get('.create-template_button').click()
    cy.wait(1000)

    cy.get('.CreateTemplatePage').find('.templatesCreatedWrapper').should('exist');
}