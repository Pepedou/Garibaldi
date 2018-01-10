const STAGE_URL = 'https://garibaldi-artchive-staging.herokuapp.com/';

const testUser = {
    username: 'lucechal_@hotmail.com',
    password: 'lucechal'
}

describe('Garibaldi v1.0.0', () => {
    it('logins successfully', () => {
        // cy.visit(STAGE_URL)

        // // Enter Credentials
        // cy.get('#username')
        //     .type(testUser.username)
        //     .should('have.value', testUser.username)

        // cy.get('#password')
        //     .type(testUser.password)
        //     .should('have.value', testUser.password)

        // // Click "login" button
        // cy.get('div.marginTop button').click()

        // cy.url()
        //     .should('include', '/home')
    })

    context('ArtPieces', function () {
        beforeEach(function () {
            cy.visit(STAGE_URL)

            // Enter Credentials
            cy.get('#username')
                .type(testUser.username)

            cy.get('#password')
                .type(testUser.password)

            // Click "login" button
            cy.get('div.marginTop button').click()
        })

        it('Adds an ArtPiece', () => {
            cy.get('.FloatingBar > div:nth-child(1) > div:nth-child(1) > button:nth-child(1)')
                .click()

            cy.url()
                .should('include', '/newArt')
            
            cy.get('#title')
                .type('Mi primera pieza')
                .should('have.value', 'Mi primera pieza')
            
            cy.get("#author")
                .type("El autor")
                .should('have.value', "El autor")

            cy.get("#measurements")
                .type("200x200")
                .should('have.value', "200x200")

            cy.get("#technique")
                .type("Técnica, Técnica, Técnica, Técnica, Técnica")
                .should('have.value', "Técnica, Técnica, Técnica, Técnica, Técnica")

            cy.get("#series")
                .type("Serie 1")
                .should('have.value', "Serie 1")

            cy.get("#tiraje")
                .type("Tiraje???")
                .should('have.value', "Tiraje???")

            cy.get("#year")
                .type("2017")
                .should('have.value', "2017")
            
            cy.get("#price")
                .type("$20,000.00 MXN")
                .should('have.value', "$20,000.00 MXN")

            cy.get('div.col-xs-12:nth-child(3) > center:nth-child(1) > div:nth-child(1) > button:nth-child(1)')
                .click()
            
            cy.get('.CategoryName')
                .click()

            const dropEvent = {
                dataTransfer: {
                    files: [
                    ],
                },
            };

            cy.fixture('Emolga.png').then((picture) => {
                return Cypress.Blob.base64StringToBlob(picture, 'image/jpeg').then((blob) => {
                    dropEvent.dataTransfer.files.push(blob);
                });
            });

            cy.get('.DropzoneSquare').trigger('drop', dropEvent)

            cy.wait(3000)

            cy.get('div#root div.SimpleLayout.container-fluid.degraded-container div.row div.col-xs-12.col-md-12.NewArtPage div.row div.col-xs-12.col-md-4.CategoriesSection center div.marginTop button')
                .click()
        })
    })
})
