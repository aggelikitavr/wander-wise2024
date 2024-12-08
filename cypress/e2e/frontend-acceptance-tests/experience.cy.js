/// <reference types="cypress" />

context('Experience', () => {

    var Experience = 5;
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    });
    
    it('delete experience correctly', () => {
    // Locate the specific DELETE block for the experience operation
    cy.get('.opblock.opblock-delete')
        .filter((index, el) => {
            // Adjust the condition to match the experience section
            return el.querySelector('.opblock-summary-path').getAttribute('data-path') === '/experiences/{experienceId}';
        })
        .find('.opblock-summary-method')
        .contains('DELETE')
        .click();
    
    // Click the "Try it out" button
    cy.get('.try-out').contains('Try it out').click();

    // Type the experience ID in the input field
    cy.get('input[placeholder="experienceId - Experience id to delete"]').type('4'); // Adjust the placeholder text accordingly

    // Execute the request
    cy.get('.execute-wrapper').contains('Execute').click();

    // Assert the expected response message
    cy.get('.response-col_description__inner')
        .invoke('text')
        .then((op_text) => {
            // Adjust the expected response if necessary
            expect(op_text).to.eq('Invalid experience id value');
        });
});
});
