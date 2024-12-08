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
        cy.get('html body div#swagger-ui section.swagger-ui.swagger-container div.swagger-ui div div.wrapper section.block.col-12.block-desktop.col-12-desktop div span div.opblock-tag-section.is-open div span div#operations-Landmarks-createLandmark.opblock.opblock-post.is-open div div.opblock-body div.responses-wrapper div.responses-inner div div table.responses-table.live-responses-table tbody tr.response td.col.response-col_description div div.highlight-code pre.microlight')
        .invoke('text').then((op_text) => {expect(op_text).to.eq('{\n  "message": "request.body.id should be integer",\n  "errors": [\n    {\n      "path": ".body.id",\n      "message": "should be integer",\n      "errorCode": "type.openapi.validation"\n    }\n  ]\n}');}); // Very spacing-strict...
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
});
