import { loginForTest } from '../support/ui-actions'
import { createTemplate, deleteTemplates } from '../commands/createTemplate'

describe('Bug Fixing', () => {
    it('addresses bug GAR#93', () => {
        //Iniciar sesión
        loginForTest(cy);

        //Ir a la pantalla de crear plantilla
        cy.get('.menu-item__templates').click()

        //Crear nuevo template
        createTemplate('Plantilla sin membrete')

        //5. Regresar al archivo y seleccionar opción de PDF en tarjeta
        cy.get("#menu-item_returnToFile")
            .click()
            .get('#grid-card_checkbox')
            .first()
            .check()
            .get('.floating-action__pdf-button')
            .click()

        //6. Seleccionar template
        cy.get('#template').select('Plantilla sin membrete')

        //7. Presionar el botón de aceptar para mostrar el PDF overlay
        cy.get('.export-pdf_button').click()
        cy.wait(1000)

        //8. Verificar que el membrete no se muestre
        cy.get('.pdfPage').find('.membrete').should('not.exist')
    })
})