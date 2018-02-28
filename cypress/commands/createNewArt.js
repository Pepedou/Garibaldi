const dropEvent = {
    dataTransfer: {
        files: [
        ],
    },
};

export const createNewArt = (cy) => {
    cy.get('#title').type('Obra de arte')
    cy.get('#author').focus() //TODO: Seleccionar el usuario correcto

    cy.fixture('../fixtures/obra.jpg').then((picture) => {
        return Cypress.Blob.base64StringToBlob(picture, 'image/jpeg').then((blob) => {
            dropEvent.dataTransfer.files.push(blob);
        });
    });

    cy.get('.DropzoneSquare').trigger('drop', dropEvent);
    cy.wait(1000);
    cy.get('.art-creation__save').click();
    cy.wait(1000)
    cy.url().should('contain', 'home');
}
