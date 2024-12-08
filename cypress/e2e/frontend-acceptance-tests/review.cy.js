/// <reference types="cypress" />

context('Review', () => {

 
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    });
    
    it('delete review correctly', () => {
        // Locate the specific DELETE block for the review operation
        cy.get('.opblock.opblock-delete')
            .filter((index, el) => {
                // Adjust the condition to match the review section
                return el.querySelector('.opblock-summary-path').
                getAttribute('data-path') === '/landmarks/{landmarkId}/reviews/{reviewId}';
            })
            .find('.opblock-summary-method')
            .contains('DELETE')
            .click();
        
        // Click the "Try it out" button
        cy.get('.try-out').contains('Try it out').click();
    
        // Type the review ID in the input field

    
        // Execute the request
        cy.get('.execute-wrapper').contains('Execute').click();
    
        // Assert the expected response message
        cy.get('.response-col_description__inner')
            .invoke('text')
            .then((op_text) => {
                // Adjust the expected response if necessary
                expect(op_text).to.eq('Successful Operation - Successful DeletionUnsuccessful Operation');
            });
    });
    
});
