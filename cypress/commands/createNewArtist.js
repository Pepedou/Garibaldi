import {testArtist} from '../support/ui-actions'

const dropEvent = {
    dataTransfer: {
        files: [
        ],
    },
};

export const createNewArtist = (cy, artist = testArtist) => {
    cy.get('#email').type(artist.username);
    cy.get('#name').type(artist.name);
    cy.get('#lastName').type(artist.lastName);
    cy.get('#nickname').type(artist.nickname);
    cy.get('#age').type(artist.age);
    cy.get('#nationality').type(artist.nationality);
    cy.get('#profession').type(artist.profession);
    cy.get('#piece').type(artist.piece);
    cy.get('#education').type(artist.education);
    cy.get('#exhibitions').type(artist.exhibitions);

    cy.fixture('../fixtures/artista.jpg').then((picture) => {
        return Cypress.Blob.base64StringToBlob(picture, 'image/jpeg').then((blob) => {
            dropEvent.dataTransfer.files.push(blob);
        });
    });

    cy.get('.DropzoneSquare').trigger('drop', dropEvent);
    cy.wait(1000);
    cy.get('.artist-creation__save').click();
    cy.wait(1000);
    cy.url().should('contain', 'artists');
}
