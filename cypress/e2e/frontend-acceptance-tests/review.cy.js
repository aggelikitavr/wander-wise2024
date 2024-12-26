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


// CSShelperFunctionFillingLandmarkIdFieldForGETReviewsOperation refers to GET operation for
// landmarks/{landmarkdId}/reviews endpoint and it executes the selection of the field wherethe path parameter
// landmarkId will be typed an then it types the value (landmarkId), given as input, in that field. Also, it
// makes the execution of the operation by clicking the "Execute" button.
Cypress.Commands.add('CSShelperFunctionFillingLandmarkIdFieldForGETReviewsOperation', {prevSubject: false},
    (landmarkdId) => {
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
            .type(landmarkdId);

        cy.get('#operations-Reviews-getReviewsForLandmark')
            .find('.execute-wrapper > button').contains('Execute')
            .click();
});

// CSShelperFunctionFillingLandmarkIdReviewIdFieldsForGETReviewOperation refers to GET operation for
// landmarks/{landmarkId}/reviews/{reviewId} endpoint and it executes the selection of the fields where the path
// parameters landmarkId and reviewId will be typed and then it types the values (landmarkId, reviewId), given
// as input, in those fields. Then it makes the execution of the operation by clicking the "Execute" button.
Cypress.Commands.add('CSShelperFunctionFillingLandmarkIdReviewIdFieldsForGETReviewOperation', {prevSubject: false}, 
    (landmarkId, reviewId) => {
        // Try the GET landmarks/{landmarkId}/reviews/{reviewId} out.
        // Confirm that the fields where the path parameters "landmarkId" and "reviewId" really exists as
        // well as the path parameters can actually be typed.
        cy.get('#operations-Reviews-getReviewsById')
            .scrollIntoView()
            .click()
        
        // Check how the section, where the button "Try it out" exists, is displayed and click on the button
        cy.get('#operations-Reviews-getReviewsById')
            .children('div').eq(1)
            .find('.opblock-section-header').eq(0)
            .find('.tab-header > div > h4 > span')
            .should('contain', 'Parameters');

        cy.get('#operations-Reviews-getReviewsById')
            .children('div').eq(1)
            .find('.opblock-section-header').eq(0)
            .find('.try-out > button')
            .should('exist')
            .should('contain', 'Try it out')
            .click();

        // Now, check if the necessary fields, where the values of path parameters "landmarkId" and "reviewId"
        // are going to be typed, really exist. Then type values in landmarkId and reviewId fields to get
        // response.
        cy.get('#operations-Reviews-getReviewsById')
            .find('.parameters-container > div')
            .find('.parameters > tbody')
            .find('tr[data-param-name="landmarkId"]') // Find the field where landmarkId should be typed
            .find('input').clear()
            .type(landmarkId)
            // The field, where landmarkId is typed, is two "levels" inside, so three parent() are needed to
            // go back to <tbody> CSS selector
            .parent().parent().parent()
            .find('tr[data-param-name="reviewId"]') // Find the field where reviewId should be typed
            .find('input').clear()
            .type(reviewId);

        cy.get('#operations-Reviews-getReviewsById')
            .find('.execute-wrapper > button').contains('Execute')
            .click();
});


// CSShelperFunctionFillingLandmarkIdFieldForPOSTReviewOperation refers to POST operation for
// landmarks/{landmarkId}/reviews endpoint and it executes the selection of the fields where the path parameter
// landmarkId will be typed and then it types the values (landmarkId), given as input, in that field.
Cypress.Commands.add('CSShelperFunctionFillingLandmarkIdFieldForPOSTReviewOperation', {prevSubject: false},
    (landmarkId) => {
        // Try the POST landmarks/{landmarkId}/reviews out.
        // Confirm that the field where the path parameter "landmarkId" really exists and the path parameter
        // can actually be typed.
        cy.get('#operations-Reviews-addReview')
            .scrollIntoView()
            .click()
        
        // Check how the section, where the button "Try it out" exists, is displayed and click on the button
        cy.get('#operations-Reviews-addReview')
            .children('div').eq(1)
            .find('.opblock-section-header').eq(0)
            .find('.tab-header > div > h4 > span')
            .should('contain', 'Parameters');

        cy.get('#operations-Reviews-addReview')
            .children('div').eq(1)
            .find('.opblock-section-header').eq(0)
            .find('.try-out > button')
            .should('exist')
            .should('contain', 'Try it out')
            .click();

        // Now, check if the necessary field, where the value of path parameter "landmarkId" is going to be
        // typed, really exists. Then type a value for landmarkId in the corresponding field.
        cy.get('#operations-Reviews-addReview')
            .find('.parameters-container > div')
            .find('.parameters > tbody')
            .find('tr[data-param-name="landmarkId"]')
            .find('input').clear()
            .type(landmarkId);
});


// CSShelperFunctionAddingRequestBodyForPOSTReviewOperation refers to POST operation for
// landmarks/{landmarkId}/reviews endpoint and it executes the operation since giving the needed request body
// in any case.
Cypress.Commands.add('CSShelperFunctionAddingRequestBodyForPOSTReviewOperation', {prevSubject: true},
    (subject, requestBody) => {
        cy.wrap(subject)
            .find('.opblock-description-wrapper > div')
            .find('.renderedMarkdown > p').should('exist').should('contain', 'Review')
            .parent().parent()
            .children('div').eq(2)
            .find('.body-param > textarea').should('exist').and('be.visible')
            .clear()
            .type(JSON.stringify(requestBody, null, 2), { parseSpecialCharSequences: false });

        cy.get('#operations-Reviews-addReview')
            .find('.execute-wrapper > button').contains('Execute')
            .click();
});


context('Acceptance & Frontend Testing for GET /landmarks/{landmarkId}/reviews', () => {
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
            // Type 348 as valid landmarkId to get response.
            cy.CSShelperFunctionFillingLandmarkIdFieldForGETReviewsOperation('348');

            // Check if the response is displayed correclty for valid landmarkId.
            cy.get('#operations-Reviews-getReviewsForLandmark')
                .CSShelperFunctionForResponse('200');
    });
    
    it('Execute a BAD REQUEST : GET landmarks/{landmarkId}/reviews giving WRONG value to the path parameter',
        () => {
            // In this test, confirm that no response is displayed when the request is not executed properly, i.e
            // giving an invalid landmarkId as path parameter.
            // Type -1 as invalid landmarkId to get response. Same behavioral response will occur, if type anything
            // that is not a positive integer.
            cy.CSShelperFunctionFillingLandmarkIdFieldForGETReviewsOperation('-1');

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

context('Acceptance & Frontend Testing for GET /landmarks/{landmarkId}/reviews/{reviewId}', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    });
    
    it('Check that Swagger UI displays the endpoint', () => {
        // In this test, confirm that the Swagger UI correclty displays the endpoint and the HTTP method
        // as referred in API documentation.

        // Confirm that the element exists and it is visible correclty.
        cy.get('#operations-Reviews-getReviewsById')
            .CSShelperFunction1('rgb(97, 175, 254)', 'rgba(97, 175, 254, 0.1)');

        // Check if the name of "GET" HTTP Method is contained in the specific CSS selector which belongs to
        // the above class selector with id=operations-Reviews-getReviewsById.
        cy.get('#operations-Reviews-getReviewsById')
            .find('div')
            .find('span').eq(0)
            .should('contain', 'GET');
        
        // Check if the path landmarks/{landmarkId}/review/{reviewId} is contained in the specific CSS selector
        // which belongs to the above class selector with id=operations-Reviews-getReviewsById.
        cy.get('#operations-Reviews-getReviewsById')
            .find('div')
            .find('span[data-path="/landmarks/{landmarkId}/reviews/{reviewId}"]')
            .should('exist')
            .parent()
            .find('div')
            .should('contain', 'Get review by review id');
    });    

    it('Execute the request : GET landmarks/{landmarkId}/reviews/{reviewId} properly to retrieve a specific review related to a specific landmark',
        () => {
            // In this test, confirm that the request is being executed correclty, while giving proper landmarkId and
            // reviewId as path parameters.
            // Type 348 as valid landmarkId and 23 as valid reviewId to get response.
            cy.CSShelperFunctionFillingLandmarkIdReviewIdFieldsForGETReviewOperation('348', '23');
            
            // Check if the response is displayed correclty for valid landmarkId and reviewId.
            cy.get('#operations-Reviews-getReviewsById')
                .CSShelperFunctionForResponse('200');
    });

    it('Execute a BAD REQUEST (1st case): GET landmarks/{landmarkId}/reviews/{reviewId} giving WRONG value to the path parameter "landmarkId"',
        () => {
            // In this test, confirm that no response is displayed when the request is not executed properly,
            // giving an invalid landmarkId as path parameter, while the given reviewId is valid.
            // Type -1 as invalid landmarkId and 23 as valid reviewId to get response.
            cy.CSShelperFunctionFillingLandmarkIdReviewIdFieldsForGETReviewOperation('-1', '23');

            // Check if the no response is displayed when giving the invalid landmarkId as path parameter.
            // Check if the only thing that is displyed is the example responses and nothing else.
            // Also, check if the border/background-color of the field, where the value of path parameter
            // "landmarkId" is typed, is red (explicit shades of red). Then check that this doesn't apply to
            // the field of "reviewId".
            cy.get('#operations-Reviews-getReviewsById')
                .CSShelperFunctionForExampleResponses1();

            // Now, check the border/background-color of two fields, where the value of path parameters
            // "landmarkId" and "reviewId" are typed
            cy.get('#operations-Reviews-getReviewsById')
            .find('.parameters > tbody')
            .find('tr[data-param-name="landmarkId"]')
            .find('input')
                .should('have.css', 'border-color', 'rgb(249, 62, 62)')
                .and('have.css', 'background-color', 'rgb(254, 235, 235)')
                .and('have.class', 'invalid')
            // The field, where landmarkId is typed, is two "levels" inside, so three parent() are needed to
            // go back to <tbody> CSS selector
            .parent().parent().parent()
            .find('tr[data-param-name="reviewId"]') // Find the field where reviewId should be typed
            .find('input')
                .should('have.css', 'border-color', 'rgb(217, 217, 217)')
                .and('have.css', 'background-color', 'rgb(255, 255, 255)')
                .and('not.have.class', 'invalid');
    });

    it('Execute a BAD REQUEST (2nd case): GET landmarks/{landmarkId}/reviews/{reviewId} giving WRONG value to the path parameter "reviewId"',
        () => {
            // In this test, confirm that no response is displayed when the request is not executed properly,
            // giving an invalid reviewId as path parameter, while the given landmarkId is valid.
            // Type 348 as valid landmarkId and "reviewId" as invalid reviewId to get response.
            cy.CSShelperFunctionFillingLandmarkIdReviewIdFieldsForGETReviewOperation('348', 'reviewId');

            // Check if the no response is displayed when giving the invalid reviewId as path parameter.
            // Check if the only thing that is displyed is the example responses and nothing else.
            // Also, check if the border/background-color of the field, where the value of path parameter
            // "reviewId" is typed, is red (explicit shades of red). Then check that this doesn't apply to the
            // field of "landmarkId".
            cy.get('#operations-Reviews-getReviewsById')
                .CSShelperFunctionForExampleResponses1();
                
            // Now, check the border/background-color of two fields, where the value of path parameters
            // "landmarkId" and "reviewId" are typed
            cy.get('#operations-Reviews-getReviewsById')
            .find('.parameters > tbody')
            .find('tr[data-param-name="landmarkId"]')
            .find('input')
                .should('have.css', 'border-color', 'rgb(217, 217, 217)')
                .and('have.css', 'background-color', 'rgb(255, 255, 255)')
                .and('not.have.class', 'invalid')
            // The field, where landmarkId is typed, is two "levels" inside, so three parent() are needed to
            // go back to <tbody> CSS selector
            .parent().parent().parent()
            .find('tr[data-param-name="reviewId"]') // Find the field where reviewId should be typed
            .find('input')
                .should('have.css', 'border-color', 'rgb(249, 62, 62)')
                .and('have.css', 'background-color', 'rgb(254, 235, 235)')
                .and('have.class', 'invalid');
    });

    it('Execute a BAD REQUEST (3rd case): GET landmarks/{landmarkId}/reviews/{reviewId} giving WRONG values to the path parameters',
        () => {
            // In this test, confirm that no response is displayed when the request is not executed properly,
            // giving an invalid reviewId as path parameter as well as an invalid landmarkId as path parameter.
            // Type 0 as invalid landmarkId and 2.5 as invalid reviewId to get response.
            cy.CSShelperFunctionFillingLandmarkIdReviewIdFieldsForGETReviewOperation('0', '2.5');

            // Check if the no response is displayed when giving the invalid landmarkId as path parameter.
            // Check if the only thing that is displyed is the example responses and nothing else.
            // Also, check if the border/background-color of the fields, where the values of path parameters
            // "landmarkId" and "reviewId" are typed, is red (explicit shade of red)
            cy.get('#operations-Reviews-getReviewsById')
                .CSShelperFunctionForExampleResponses1();
                
            // Now, check the border/background-color of two fields, where the value of path parameters
            // "landmarkId" and "reviewId" are typed
            cy.get('#operations-Reviews-getReviewsById')
            .find('.parameters > tbody')
            .find('tr[data-param-name="landmarkId"]')
            .find('input')
            .should('have.css', 'border-color', 'rgb(249, 62, 62)')
            .and('have.css', 'background-color', 'rgb(254, 235, 235)')
            .and('have.class', 'invalid')
            // The field, where landmarkId is typed, is two "levels" inside, so three parent() are needed to
            // go back to <tbody> CSS selector
            .parent().parent().parent()
            .find('tr[data-param-name="reviewId"]') // Find the field where reviewId should be typed
            .find('input')
                .should('have.css', 'border-color', 'rgb(249, 62, 62)')
                .and('have.css', 'background-color', 'rgb(254, 235, 235)')
                .and('have.class', 'invalid');
    });
})

context('Acceptance & Frontend Testing for POST /landmarks/{landmarkId}/reviews', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    });

    it('Check that Swagger UI displays the endpoint', () => {
        // In this test, confirm that the Swagger UI correclty displays the endpoint and the HTTP method
        // as referred in API documentation.

        // Confirm that the element exists and it is visible correclty.
        cy.get('#operations-Reviews-addReview')
            .CSShelperFunction1('rgb(73, 204, 144)', 'rgba(73, 204, 144, 0.1)');
        
        // Check if the name of "POST" HTTP Method is contained in the specific CSS selector which belongs to
        // the above class selector with id=operations-Reviews-addReview.
        cy.get('#operations-Reviews-addReview')
            .find('div')
            .find('span').eq(0)
            .should('contain', 'POST');
        
        // Check if the path landmarks/{landmarkId}/review is contained in the specific CSS selector which
        // belongs to the above class selector with id=operations-Reviews-addReview.
        cy.get('#operations-Reviews-addReview')
            .find('div')
            .find('span[data-path="/landmarks/{landmarkId}/reviews"]')
            .should('exist')
            .parent()
            .find('div')
            .should('contain', 'Create a review');
    });

    it('Execute the request : POST landmarks/{landmarkId}/reviews properly to create a review for a specific landmark',
        () => {
            // In this test, confirm that the request is being executed correclty, while giving proper landmarkId
            // as path parameter and giving a proper request body as required for the POST request.
            const requestBody = {
                        "review_id": 2,
                        "review_text": "This landmark worths visiting...",
                        "date": "15th of November 2023",
                        "numOfStars": 0,
                        "comments": []
                        };

            // Type 348 as valid landmarkId.
            cy.CSShelperFunctionFillingLandmarkIdFieldForPOSTReviewOperation('348');

            // Now, check if the necessary field, where the required request body is going to be given, really
            // exists. Also, check if the object that will constitute the required request body can be typed.
            cy.get('#operations-Reviews-addReview')
                .find('.opblock-section')
                .children('div').eq(2)
                .find('.opblock-section-header > h4')
                .should('exist')
                .should('contain', 'Request body') // Confirm that the head label "Request body" above the request body field exists.
                // Also, check that the red colored "required" label exists after "Request body" label.
                .then($el => {
                    const after = window.getComputedStyle($el[0], '::after');
                    expect(after.content).to.eq('"required"');
                    expect(after.color).to.eq('rgba(255, 0, 0, 0.6)');
                })
                .parent().parent()
                // Now, find the field where the request body is going to be given.
                .CSShelperFunctionAddingRequestBodyForPOSTReviewOperation(requestBody);

            // Check if the response is displayed correclty for valid landmarkId and proper request body.
            cy.get('#operations-Reviews-addReview')
                .CSShelperFunctionForResponse('201');
    });

    it('Execute a BAD REQUEST : POST landmarks/{landmarkId}/reviews giving WRONG value to the path parameter',
        () => {
            // In this test, confirm that no response is displayed when the request is not executed properly,
            // because of giving an invalid landmarkId as path parameter.
            const requestBody = {
                "review_id": 2,
                "review_text": "This landmark worths visiting...",
                "date": "15th of November 2023",
                "numOfStars": 0,
                "comments": []
                };

            // Type -348 as invalid landmarkId to get response. Same behavioural response will occur if type
            // anything that is not a positive integer.
            cy.CSShelperFunctionFillingLandmarkIdFieldForPOSTReviewOperation('-348');

            // Now, check if the necessary field, where the required request body is going to be given, really
            // exists. Also, check if the object that will constitute the required request body can be typed.
            cy.get('#operations-Reviews-addReview')
                .find('.opblock-section')
                .children('div').eq(2)
                .CSShelperFunctionAddingRequestBodyForPOSTReviewOperation(requestBody);

            // Check if the no response is displayed when giving the invalid landmarkId as path parameter.
            // Check if the only thing that is displyed is the example responses and nothing else.
            // Also, check if the border-color of the field, where the value of path parameter "landmarkId" is
            // typed, is red (explicit shade of red: #f93e3e).
            cy.get('#operations-Reviews-addReview')
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
                .children('tr[data-code="201"]').should('exist').and('be.visible')
                
                // Check that the example response for unsuccessful operation because of "Invalid landmarkId
                // supplied" (with response status code 400) exists and it is visible
                .parent().children('tr[data-code="400"]').should('exist').and('be.visible')
                
                // Now, check the border/background-color of the field, where the value of path parameter
                // "landmarkId" is typed.
                cy.get('#operations-Reviews-addReview')
                .find('.parameters > tbody')
                .find('tr[data-param-name="landmarkId"]')
                .find('input')
                    .should('have.css', 'border-color', 'rgb(249, 62, 62)')
                    .and('have.css', 'background-color', 'rgb(254, 235, 235)')
                    .and('have.class', 'invalid');
    });

    it('Execute a BAD REQUEST : POST landmarks/{landmarkId}/reviews NOT giving the PROPER FORM of request body',
        () => {
            // In this test, confirm that the response displayed is 400 when the request is not executed properly,
            // because of not giving a request body with the proper form.
            const requestBody = {
                "date": "15th of November 2023",
                "numOfStars": 0,
                "comments": []
                };

            // For this test, type 348 as a valid landmarkId to get response.
            cy.CSShelperFunctionFillingLandmarkIdFieldForPOSTReviewOperation('348');

            // Now, check if the necessary field, where the required request body is going to be given, really
            // exists. Also, check if the object that will constitute the required request body can be typed.
            // Type a request body, that does not have the proper form, e.g. the review_id and the review_text
            // properties of a Review, which is going to be the request body, are omitted
            cy.get('#operations-Reviews-addReview')
                .find('.opblock-section')
                .children('div').eq(2)
                .CSShelperFunctionAddingRequestBodyForPOSTReviewOperation(requestBody);
            
            // Check if the response displayed, when POST is not executed correclty, is the expected.
            cy.get('#operations-Reviews-addReview')
                .CSShelperFunctionForResponse('400');
    });


    context('Acceptance & Frontend Testing for POST /landmarks/{landmarkId}/reviews/{reviewId}/numOfStars', () => {

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

context('Acceptance & Frontend Testing for Delete /landmarks/{landmarkId}/reviews/{reviewId}', () => {
    const swaggerUrl = 'http://localhost:8080/docs';
    const validLandmarkId = 348;
    const validReviewId = 23;

    beforeEach(() => {
        cy.visit(swaggerUrl);
    });

    it('Execute the request : DELETE landmarks/{landmarkId}/reviews/{reviewId} properly to delete a specific review related to a specific landmark', () => {
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

    it('Execute a BAD REQUEST (1ST) : DELETE landmarks/{landmarkId}/reviews giving WRONG value to the path parameter', () => {
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

    it('Execute a BAD REQUEST (2ND) : DELETE landmarks/{landmarkId}/reviews giving WRONG value to the path parameter', () => {
        const invalidLandmarkId = 9;
        const invalidReviewId = 450;

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

})
