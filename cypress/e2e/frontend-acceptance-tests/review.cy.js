// ACCEPTANCE & FRONTEND TESTS FOR REVIEW RESOURCE

Cypress.Commands.add('CSShelperFunction1', { prevSubject: true }, (subject, borderColor, backgroundColor) => {
    cy.wrap(subject)
        .scrollIntoView()
        .should('exist')
        .and('be.visible')
        .and('have.css', 'border-color', borderColor)
        .and('have.css', 'background-color', backgroundColor);
});

Cypress.Commands.add('CSShelperFunctionForResponse', { prevSubject: true}, (subject, statusCode) => {
    cy.wrap(subject)
        .find('.responses-wrapper > div > h4').contains('Responses') // Check if the heading label "Responses" exists 
        .parent().parent()
        .find('.responses-inner > div > div')
        .find('table > thead')
        .find('.responses-header')
        .children('td').eq(0).contains('Code') // Check if the label "Code" exists
        .parent().children('td').eq(1).contains('Details') // Check if the label "Details" exists
        .parent().parent().parent()
        .find('tbody > tr')
        .children('td').eq(0).should('contain', statusCode) // Check if the response status code is the expected and displayed under the labbel "Code"
        .parent().children('td').eq(1)
        .find('div > h5').contains('Response body') // Check if the label "Response body" exists and displayed below label "Details"
        .parent()
        .find('.highlight-code')
        // Check that the CSS selector which contains the actual response body exists and then check
        // that it has children which means that the response body is indeed displayed.
        .find('.microlight').should('exist').and('be.visible')
        .children().should('have.length.greaterThan', 0);
});


// CSShelperFunctionForExampleResponses1 refers to GET operations for landmarks/{landmarkId}/reviews and
// landmarks/{landmarkId}/reviews/{reviewId} endpoints.
Cypress.Commands.add('CSShelperFunctionForExampleResponses1', {prevSubject: true}, (subject) => {
    cy.wrap(subject)
        .find('.responses-wrapper > div > h4').contains('Responses') // Check if the heading label "Responses" exists 
        .parent().parent()
        .find('.responses-inner').should('exist').and('be.visible')
        // Check that no response is displayed for bad request. The only this displayed should be the
        // example responses declared in API documentation
        .children().should('have.length', 1)

        // Now, check that this children of the above CSS selector is refered to the example responses
        .find('thead').should('exist').and('be.visible')
        .parent()
        .find('tbody')
        // Check that the example response for successful operation of GET request existsand it's visible
        .children('tr[data-code="200"]').should('exist').and('be.visible')

        // Check that the example response for unsuccessful operation because of "Invalid parameter
        // supplied" (with response status code 400) exists and it is visible
        .parent().children('tr[data-code="400"]').should('exist').and('be.visible')

        // Check that the example response for unsuccessful operation because of "Response Object not found"
        // (with response status code 404) exists an it is visible.
        .parent().children('tr[data-code="404"]').should('exist').and('be.visible');
});


describe('Acceptance & Frontend Testing for GET /landmarks/{landmarkId}/reviews', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    });
    
    it('Check that Swagger UI displays the endpoint', () => {
        // In this test, confirm that the Swagger UI correclty displays the endpoint and the HTTP method
        // as referred in API documentation.

        // Confirm that the element exists and it is visible correclty.
        cy.get('#operations-Reviews-getReviewsForLandmark')
            .CSShelperFunction1('rgb(97, 175, 254)', 'rgba(97, 175, 254, 0.1)');

        // Check if the name of "GET" HTTP Method is contained in the specific CSS selector which belongs to
        // the above class selector with id=operations-Reviews-getReviewsForLandmark.
        cy.get('#operations-Reviews-getReviewsForLandmark')
            .find('div')
            .find('span').eq(0)
            .should('contain', 'GET');
        
        // Check if the path landmarks/{landmarkId}/review is contained in the specific CSS selector which
        // belongs to the above class selector with id=operations-Reviews-getReviewsForLandmark.
        cy.get('#operations-Reviews-getReviewsForLandmark')
            .find('div')
            .find('span[data-path="/landmarks/{landmarkId}/reviews"]')
            .should('exist')
            .parent()
            .find('div')
            .should('contain', 'Get reviews for the current landmark');
    });

    it('Execute the request : GET landmarks/{landmarkId}/reviews properly to retrieve all the reviews related to a specific landmark',
        () => {
            // In this test, confirm that the request is being executed correclty, while giving proper landmarkId
            // as path parameter.
            
            // Try the GET landmarks/{landmarkId}/reviews out.
            // Confirm that the field where the path parameter "landmarkId" really exists and the path parameter
            // can actually be typed.
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .scrollIntoView()
                .click()
            
            // Check how the section, where the button "Try it out" exists, is displayed and click on the button
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .children('div').eq(1)
                .find('.opblock-section-header').eq(0)
                .find('.tab-header > div > h4 > span')
                .should('contain', 'Parameters');

            cy.get('#operations-Reviews-getReviewsForLandmark')
                .children('div').eq(1)
                .find('.opblock-section-header').eq(0)
                .find('.try-out > button')
                .should('exist')
                .should('contain', 'Try it out')
                .click();

            // Now, check if the necessary field, where the value of path parameter "landmarkId" is going to be
            // typed, really exists. Then type 348 as valid landmarkId to get response.
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .find('.parameters-container > div')
                .find('.parameters > tbody')
                .find('tr[data-param-name="landmarkId"]')
                .find('input').clear()
                .type('348');

            cy.get('#operations-Reviews-getReviewsForLandmark')
                .find('.execute-wrapper > button').contains('Execute')
                .click();

            // Check if the response is displayed correclty for valid landmarkId.
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .CSShelperFunctionForResponse('200');
    });
    
    it('Execute a BAD REQUEST : GET landmarks/{landmarkId}/reviews giving WRONG value to the path parameter',
        () => {
            // In this test, confirm that no response is displayed when the request is not executed properly, i.e
            // giving an invalid landmarkId as path parameter.
            
            // Try the GET landmarks/{landmarkId}/reviews out.
            // Confirm that the field where the path parameter "landmarkId" really exists and the path parameter
            // can actually be typed.
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .scrollIntoView()
                .click()
            
            // Check how the section, where the button "Try it out" exists, is displayed and click on the button
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .children('div').eq(1)
                .find('.opblock-section-header').eq(0)
                .find('.tab-header > div > h4 > span')
                .should('contain', 'Parameters');

            cy.get('#operations-Reviews-getReviewsForLandmark')
                .children('div').eq(1)
                .find('.opblock-section-header').eq(0)
                .find('.try-out > button')
                .should('exist')
                .should('contain', 'Try it out')
                .click();

            // Now, check if the necessary field, where the value of path parameter "landmarkId" is going to be
            // typed, really exists. Then type -1 as invalid landmarkId to get response.
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .find('.parameters-container > div')
                .find('.parameters > tbody')
                .find('tr[data-param-name="landmarkId"]')
                .find('input').clear()
                .type('-1'); // Same behaviour if type anything that is not a positive integer

            cy.get('#operations-Reviews-getReviewsForLandmark')
                .find('.execute-wrapper > button').contains('Execute')
                .click();

            // Check if the no response is displayed when giving the invalid landmarkId as path parameter.
            // Check if the only thing that is displyed is the example responses and nothing else.
            // Also, check if the border-color of the field, where the value of path parameter "landmarkId" is
            // typed, is red (explicit shade of red: #f93e3e).
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .CSShelperFunctionForExampleResponses1();

                // Now, check the border/background-color of the field, where the value of path parameter
                // "landmarkId" is typed.
                cy.get('#operations-Reviews-getReviewsForLandmark')
                .find('.parameters > tbody')
                .find('tr[data-param-name="landmarkId"]')
                .find('input')
                    .should('have.css', 'border-color', 'rgb(249, 62, 62)')
                    .and('have.css', 'background-color', 'rgb(254, 235, 235)')
                    .and('have.class', 'invalid');
    });

})