context('Landmark', () => {

    var newLandmark = '{ "id": 4, "name": "Buda Castle", "details": "Buda Castle is a historic royal palace in Budapest, Hungary", "location": [ "47.4979° N", "19.0399° E" ] }';

    beforeEach(() => {
        cy.visit('http://localhost:8080/docs'); 
    });

    it('should return "Landmark Created!"', () => {
        cy.get('.opblock-summary-path').contains('/landmarks').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('.body-param').clear();
        newLandmark.split('').forEach(char => {
            cy.get('.body-param').type(char);
        });
        cy.get('.execute-wrapper').contains('Execute').click();
        cy.get('.response-col_description__inner').invoke('text').then((op_text) => {expect(op_text).to.eq('Landmark Created!');});
    });
});
