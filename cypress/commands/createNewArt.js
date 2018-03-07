import {testArtist} from '../support/ui-actions'

const dropEvent = {
    dataTransfer: {
        files: [
        ],
    },
};

export const createNewArt = (cy, artist = testArtist) => {
    cy.get('#title').type('Obra de arte')
    cy.window().then(win => {
        const artistMapElement = win.getArtistMap(artist.username);
        win.runArtHandleOnNewRequest(artistMapElement, 'author');
    })

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
