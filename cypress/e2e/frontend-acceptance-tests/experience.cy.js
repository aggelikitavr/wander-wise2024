/// <reference types="cypress" />

context('Experience', () => {

    var Experience = 5; // Existing experience ID for the valid test case

    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    });

    it('delete experience correctly', () => {
        // Locate the specific DELETE block for the experience operation
        cy.get('.opblock.opblock-delete')
            .filter((index, el) => {
                return el.querySelector('.opblock-summary-path').getAttribute('data-path') === '/experiences/{experienceId}';
            })
            .find('.opblock-summary-method')
            .contains('DELETE')
            .click();
    
        // Click the "Try it out" button
        cy.get('.try-out').contains('Try it out').click();

        // Type the experience ID in the input field (valid ID)
        cy.get('input[placeholder="experienceId - Experience id to delete"]').type('4'); 

        // Execute the request
        cy.get('.execute-wrapper').contains('Execute').click();

        // Assert the expected response message (successful deletion)
        cy.get('.response-col_description__inner')
            .invoke('text')
            .then((op_text) => {
                expect(op_text).to.eq('Experience deleted successfully!'); // Adjust as necessary
            });
    });

    it('delete experience with invalid id', () => {
        const invalidExperienceId = 9999; // Non-existent experience ID

        // Locate the specific DELETE block for the experience operation
        cy.get('.opblock.opblock-delete')
            .filter((index, el) => {
                return el.querySelector('.opblock-summary-path').getAttribute('data-path') === '/experiences/{experienceId}';
            })
            .find('.opblock-summary-method')
            .contains('DELETE')
            .click();
    
        // Click the "Try it out" button
        cy.get('.try-out').contains('Try it out').click();

        // Type the invalid experience ID in the input field
        cy.get('input[placeholder="experienceId - Experience id to delete"]').type(invalidExperienceId);

        // Execute the request
        cy.get('.execute-wrapper').contains('Execute').click();

        // Assert the expected error response (404 or 400 depending on your API behavior)
        cy.get('.response-col_description__inner')
            .invoke('text')
            .then((op_text) => {
                // Adjust this based on your API's error message for invalid IDs
                expect(op_text).to.eq('Invalid experience id value'); 
            });
    });

});
