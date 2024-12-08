/// <reference types="cypress" />

context('Landmark', () => {

    var newLandmark = '{ "id": 4, "name": "Buda Castle", "details": "Buda Castle is a historic royal palace in Budapest, Hungary", "location": [ "47.4979° N", "19.0399° E" ] }';

    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    });

    // it('does something', () => {
    //     cy.get('.opblock-summary-path').contains('/landmarks').click();
    //     cy.get('.try-out').contains('Try it out').click();
    //     cy.get('.body-param').clear();
    //     newLandmark.split('').forEach(char => {
    //         cy.get('.body-param').type(char);
    //     });
    //     cy.get('.execute-wrapper').contains('Execute').click();
    //     cy.get('.response-col_description__inner').invoke('text').then((op_text) => {expect(op_text).to.eq('successful operation');});
    // })

    
    //delete landmark correctly
    var landmarkId = 4;

  
    // Locate the specific DELETE block for /landmarks/{landmarkId}
    //PROLEM: The test is not working because the landmarkId is nowhere because we have no database so i cant have right and wrong test
    it('delete landmark correctly', () => {
        // Locate the specific DELETE block for /landmarks/{landmarkId}
        cy.get('.opblock.opblock-delete')
            .filter((index, el) => {
                return el.querySelector('.opblock-summary-path').getAttribute('data-path') === '/landmarks/{landmarkId}';
            })
            .find('.opblock-summary-method')
            .contains('DELETE')
            .click();
    
        cy.get('.try-out').contains('Try it out').click();
        cy.get('input[placeholder="landmarkId - Landmark id to delete"]').type('4');
        cy.get('.execute-wrapper').contains('Execute').click();
        cy.get('.response-col_description__inner').invoke('text').then((op_text) => {expect(op_text).to.eq('Invalid landmark id value');});
    })



});
