/// <reference types="cypress" />

context('Review', () => {
    const swaggerUrl = 'http://localhost:8080/docs';
    const validLandmarkId = 348;
    const validReviewId = 23;

    beforeEach(() => {
        cy.visit(swaggerUrl);
    });

    it('delete review correctly', () => {
        // Locate the specific DELETE block for the review operation
        cy.get('.opblock.opblock-delete').filter((index, el) => {
            // Match the DELETE block with the correct path
            return el.querySelector('.opblock-summary-path')
                .getAttribute('data-path') === '/landmarks/{landmarkId}/reviews/{reviewId}';
        })
        .find('.opblock-summary-method')
        .contains('DELETE')
        .click();

        // Click the "Try it out" button
        cy.get('.try-out').contains('Try it out').click();

        // Input valid parameters
        cy.get('input[placeholder*="landmarkId"]').clear().type(validLandmarkId);
        cy.get('input[placeholder*="reviewId"]').clear().type(validReviewId);

        // Execute the request
        cy.get('.execute-wrapper').contains('Execute').click();

        // Assert the expected response message (assuming it succeeds with 200)
        cy.get('.response-col_status').contains('200');
        cy.get('.responses-wrapper').should('contain', 'The review has been successfully deleted.');
    });

    it('returns a bad request for invalid IDs', () => {
        const invalidLandmarkId = 1;
        const invalidReviewId = 9999;

        // Locate and expand the DELETE block for the review operation
        cy.get('.opblock.opblock-delete').filter((index, el) => {
            return el.querySelector('.opblock-summary-path')
                .getAttribute('data-path') === '/landmarks/{landmarkId}/reviews/{reviewId}';
        })
        .find('.opblock-summary-method')
        .contains('DELETE')
        .click();

        // Click "Try it out" and input invalid parameters
        cy.get('.try-out').contains('Try it out').click();
        cy.get('input[placeholder*="landmarkId"]').clear().type(invalidLandmarkId);
        cy.get('input[placeholder*="reviewId"]').clear().type(invalidReviewId);

        // Execute the request
        cy.get('.execute-wrapper').contains('Execute').click();

        // Assert the expected "Bad Request" error in the response
        cy.get('.response-col_status').contains('400');
        cy.get('.responses-wrapper').should('contain', 'Error: Bad Request');
    });
});
