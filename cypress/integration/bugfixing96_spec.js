import { loginForTest, testArtist, logout } from '../support/ui-actions'
import { createNewArtist } from '../commands/createNewArtist'
import { createNewUser } from '../commands/createNewUser'

describe('Bug Fixing', () => {
    it('addresses bug GAR#96', () => {
        // 1. Iniciar sesión con un Gestor Cultural
        loginForTest(cy);

        // 2. Crear un artista
        cy.get('.menu-item__artists')
            .click()
            .get('.floating-action__add-button')
            .click();

        createNewArtist(cy);

        // 3. Crear una obra para el artista.
        cy.get('.menu-item__file')
            .click()
            .get('.floating-action__add-button')
            .click();

        createNewArt(cy);

        // 4. Cerrar sesión.
        logout(cy);

        // 5. Crear un Artista con los mismos datos que el artista creado en el paso 2 sólo con un nombre diferente.
        cy.get('#registerOption').click();
        createNewUser(cy, 'Artista');

        // 6. Iniciar sesión con el artista del paso 5.
        loginForTest(cy, testArtist);
        
        //TODO: Assert para ver si el nombre está diferente
    })
})
