/// <reference types="cypress" />

context('Landmark', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs'); // Swagger documentation URL
    });

    it('delete landmark correctly', () => {
        const landmarkId = 4;

        
        // Perform the DELETE operation in Swagger UI
        cy.get('.opblock.opblock-delete')
            .filter((index, el) => {
                return el.querySelector('.opblock-summary-path').getAttribute('data-path') === '/landmarks/{landmarkId}';
            })
            .find('.opblock-summary-method')
            .contains('DELETE')
            .click();

        cy.get('.try-out').contains('Try it out').click();
        cy.get('input[placeholder="landmarkId - Landmark id to delete"]').type(landmarkId);
        cy.get('.execute-wrapper').contains('Execute').click();

        cy.get('.col.response-col_status').contains('200'); // Expecting 200 OK
        });



    it('delete landmark with invalid id', () => {
            const invalidLandmarkId = 9999; // Assuming this landmark ID doesn't exist
    
        // Intercept DELETE request and mock a 404 response for non-existent landmark
       
        // Perform the DELETE operation in Swagger UI
        cy.get('.opblock.opblock-delete')
            .filter((index, el) => {
                return el.querySelector('.opblock-summary-path').getAttribute('data-path') === '/landmarks/{landmarkId}';
            })
            .find('.opblock-summary-method')
            .contains('DELETE')
            .click();

        cy.get('.try-out').contains('Try it out').click();
        cy.get('input[placeholder="landmarkId - Landmark id to delete"]').type(invalidLandmarkId);
        cy.get('.execute-wrapper').contains('Execute').click();

        cy.get('.col.response-col_status').contains('400'); // Expecting 400 Bad Request
        });

    it('delete landmark with invalid type of id', () => {
        const invalidLandmarkId = -45; // Assuming this landmark ID doesn't exist

    // Intercept DELETE request and mock a 404 response for non-existent landmark
   
    // Perform the DELETE operation in Swagger UI
    cy.get('.opblock.opblock-delete')
        .filter((index, el) => {
            return el.querySelector('.opblock-summary-path').getAttribute('data-path') === '/landmarks/{landmarkId}';
        })
        .find('.opblock-summary-method')
        .contains('DELETE')
        .click();

    cy.get('.try-out').contains('Try it out').click();
    cy.get('input[placeholder="landmarkId - Landmark id to delete"]').type(invalidLandmarkId);
    cy.get('.execute-wrapper').contains('Execute').click();

    cy.get('.col.response-col_status').contains('400'); // Expecting 400 Bad Request
    });

});       


