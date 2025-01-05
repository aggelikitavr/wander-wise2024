context('Landmark', () => {

    var newLandmark = '{ "id": 4, "name": "Buda Castle", "details": "Buda Castle is a historic royal palace in Budapest, Hungary", "location": [ "47.4979° N", "19.0399° E" ] }';
    var newWrongLandmark = '{ "id": "4" }';
    var landmarkId = '4';
    var wrongLandmarkId = '5';

    beforeEach(() => {
        cy.visit('http://localhost:8080/docs'); 
    });

    it('should return "Landmark Created!"', () => {
        cy.get('#operations-Landmarks-createLandmark').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('.body-param').clear();
        newLandmark.split('').forEach(char => {
            cy.get('.body-param').type(char);
        });
        cy.get('.execute').click();
        cy.get('.response-col_description__inner > div:nth-child(1)').invoke('text').then((op_text) => {expect(op_text).to.eq('Landmark Created!');});
    });

    it('should return message stating the wrong parameter type', () => {
        cy.get('#operations-Landmarks-createLandmark').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('.body-param').clear();
        newWrongLandmark.split('').forEach(char => {
            cy.get('.body-param').type(char);
        });
        cy.get('.execute').click();
        cy.get('html body div#swagger-ui section.swagger-ui.swagger-container div.swagger-ui div div.wrapper section.block.col-12.block-desktop.col-12-desktop div span div.opblock-tag-section.is-open div.no-margin div.operation-tag-content span div#operations-Landmarks-createLandmark.opblock.opblock-post.is-open div.no-margin div.opblock-body div.responses-wrapper div.responses-inner div div table.responses-table.live-responses-table tbody tr.response td.response-col_description div div.highlight-code pre.microlight')
        .invoke('text').then((op_text) => {expect(op_text).to.eq('{\n  "message": "request/body/id must be integer",\n  "errors": [\n    {\n      "path": "/body/id",\n      "message": "must be integer",\n      "errorCode": "type.openapi.validation"\n    }\n  ]\n}');}); // Very spacing-strict...
    });

    it('should return 200 (the Landmark with landmarkId was found and retrieved)', () => {
        cy.get('#operations-Landmarks-getLandmarkById').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('td.parameters-col_description > input:nth-child(2)').type(landmarkId);
        cy.get('.execute').click();
        cy.get('table.responses-table:nth-child(4) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)').invoke('text').then((op_text) => {expect(op_text).to.eq('200');});
    });

    it('should not return a "Response body"', () => {
        cy.get('#operations-Landmarks-getLandmarkById').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('td.parameters-col_description > input:nth-child(2)').type(wrongLandmarkId);
        cy.get('.execute').click();
        cy.get('table.responses-table:nth-child(4) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)').invoke('text').then((op_text) => {expect(op_text).to.eq('404');});
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
        cy.get('input[placeholder="landmarkId"]').type(landmarkId);
        cy.get('.execute-wrapper').contains('Execute').click();

        cy.get('.response > .response-col_status').contains('200'); // Expecting 200 OK
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
        cy.get('input[placeholder="landmarkId"]').type(invalidLandmarkId);
        cy.get('.execute-wrapper').contains('Execute').click();

        cy.get('.response > .response-col_status').contains('400'); // Expecting 400 Bad Request
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
    cy.get('input[placeholder="landmarkId"]').type(invalidLandmarkId);
    cy.get('.execute-wrapper').contains('Execute').click();

    cy.get('.response > .response-col_status').contains('400'); // Expecting 400 Bad Request
    });
});
