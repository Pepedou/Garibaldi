import { loginForTest } from '../support/ui-actions'

const dropEvent = {
    dataTransfer: {
        files: [
        ],
    },
};

describe('Bug Fixing', () => {

    before(() => {
        // TODO: Reset DB or delete state.
    });

    it('addresses bug GAR#96', () => {
        const testArtist = {
            username: 'correo@mail.com',
            password: 'ABC123',
            name: 'Nombre',
            lastName: 'Artistico',
            nickname: 'Genial',
            age: '29',
            nationality: 'Mexico',
            profession: 'Artista',
            piece: 'Pieza',
            education: 'Universidad',
            exhibitions: 'Muchas.',
            birthDate: '28-Feb-2017',
            address1: 'Direccion 1',
            address2: 'Direccion 2',
            city: 'Mexico',
            state: 'Mexico',
            country: 'Mexico'
        };
        
        // 1. Iniciar sesión con un Gestor Cultural
        loginForTest(cy);

        // 2. Crear un artista
        cy.get('.menu-item__artists')
            .click()
            .get('.floating-action__add-button')
            .click();
        // TODO: Assert

        cy.get('#email').type(testArtist.username);
        cy.get('#name').type(testArtist.name);
        cy.get('#lastName').type(testArtist.lastName);
        cy.get('#nickname').type(testArtist.nickname);
        cy.get('#age').type(testArtist.age);
        cy.get('#nationality').type(testArtist.nationality);
        cy.get('#profession').type(testArtist.profession);
        cy.get('#piece').type(testArtist.piece);
        cy.get('#education').type(testArtist.education);
        cy.get('#exhibitions').type(testArtist.exhibitions);
        cy.get('#culturalHelperId').type('a');

        cy.fixture('../fixtures/artista.jpg').then((picture) => {
            return Cypress.Blob.base64StringToBlob(picture, 'image/jpeg').then((blob) => {
                dropEvent.dataTransfer.files.push(blob);
            });
        });

        cy.get('.DropzoneSquare').trigger('drop', dropEvent);
        cy.wait(1000);
        cy.get('.artist-creation__save').click();
        // TODO: Assert

        // 3. Crear una obra para el artista.
        cy.get('.menu-item__file')
            .click()
            .get('.floating-action__add-button')
            .click();
        // TODO: Assert

        cy.get('.title').type('Obra de arte')
        cy.get('.author').focus()
        
        // 4. Cerrar sesión.
        cy.wait(1000)
        cy.get('.icon-menu__button').click()
        cy.get('.icon-menu__logout').click()
        // TODO: Assert

        // 5. Crear un Artista con los mismos datos que el artista creado en el paso 2 sólo con un nombre diferente.
        cy.visit('http://localhost:3000/', { timeout: 6000 })
        cy.get('#registerOption').click()
        // TODO: Assert

        cy.get('#email').type(testArtist.username)
        cy.get('#name').type('Diferente')
        cy.get('#confirmEmail').type(testArtist.username)
        cy.get('#lastName').type(testArtist.lastName)
        cy.get('#password').type(testArtist.password)
        cy.get('#confirmPassword').type(testArtist.password)
        cy.get('#birthDate').type(testArtist.birthDate)
        cy.get('#address1').type(testArtist.address1)
        cy.get('#ownerType').select('Artista');
        cy.get('#address2').type(testArtist.address2)
        cy.get('#city').type(testArtist.city)
        cy.get('#state').type(testArtist.state)
        cy.get('#country').type(testArtist.country)
        cy.get('.create-user-form__save').click()
        // TODO: Assert

        // 6. Iniciar sesión con el artista del paso 5.
        loginForTest(cy, testArtist);
        // 7. Assert?
    })
})
