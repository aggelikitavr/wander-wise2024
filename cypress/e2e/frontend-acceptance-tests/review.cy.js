context('Review', () => {

    var newEvaluation = '{ "numOfStars": 4 }';
    var landmarkId = '4';
    var wrongLandmarkId = '5';
    var reviewId = '23';
    var wrongReviewId = '233';

    beforeEach(() => {
        cy.visit('http://localhost:8080/docs'); 
    });

    it('should return 201 (meaning a successful evaluation)', () => {
        cy.get('#operations-Reviews-evaluateReview').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(2)').clear();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(2)').type(landmarkId);
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(2)').clear();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(2)').type(reviewId);
        cy.get('.body-param').clear();
        newEvaluation.split('').forEach(char => {
            cy.get('.body-param').type(char);
        });
        cy.get('.execute').click();
        cy.get('table.responses-table:nth-child(4) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)').invoke('text').then((op_text) => {expect(op_text).to.eq('201');});
    });

    it('should return error 404 (the Review with wrongLandmarkId was not found)', () => {
        cy.get('#operations-Reviews-evaluateReview').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(2)').clear();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(2)').type(wrongLandmarkId);
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(2)').clear();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(2)').type(reviewId);
        cy.get('.body-param').clear();
        newEvaluation.split('').forEach(char => {
            cy.get('.body-param').type(char);
        });
        cy.get('.execute').click();
        cy.get('table.responses-table:nth-child(4) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)').invoke('text').then((op_text) => {expect(op_text).to.eq('400');});
    });

    it('should return error 404 (the Review with wrongReviewId was not found', () => {
        cy.get('#operations-Reviews-evaluateReview').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(2)').clear();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(2)').type(landmarkId);
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(2)').clear();
        cy.get('.parameters > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(2)').type(wrongReviewId);
        cy.get('.body-param').clear();
        newEvaluation.split('').forEach(char => {
            cy.get('.body-param').type(char);
        });
        cy.get('.execute').click();
        cy.get('table.responses-table:nth-child(4) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)').invoke('text').then((op_text) => {expect(op_text).to.eq('400');});
    });
});
