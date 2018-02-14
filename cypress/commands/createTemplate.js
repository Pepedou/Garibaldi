export const createTemplate = (name, withMembrete = false) => {
    //Ingresar la información del formulario
    cy.get('#name').type(name)
    if(withMembrete) {
        cy.get('#template-option__noMembrete').check()
    } else {
        cy.get('#template-option__noMembrete').uncheck()
    }

    //Guardar template
    cy.get('.create-template_button').click()
    cy.wait(1000)
}