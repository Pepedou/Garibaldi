export const deleteCards = (cy) => {
    cy.get('.grid-card_checkbox')
        .each($el => {
            cy.wrap($el).click();
        });

    cy.get('.floating-action__delete-button').click();
    cy.get('.alert-info').should('contain', 'No se encontraron tarjetas para esta página');
}
