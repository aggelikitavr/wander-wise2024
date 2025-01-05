/// <reference types="cypress" />

context('Experience', () => {

    var newExperience = '{"landmarkId": 124, "name": "My experience at the White Tower", "description": "I had so much fun at the White Tower, because ...", "id": 234}';
    var wrongExperienceId = "two-hundred-thirty-four";  // Invalid id type
    var experienceId = '234';

    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    });

    //Acceptance test for successful creation of experience
    it('return "Experience created successfully"', () => {

        cy.get('#operations-Experiences-createExperience').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('.body-param').clear();
        
        cy.get('.body-param').type(newExperience, { parseSpecialCharSequences: false });
        
        cy.get('.execute').click();
        cy.get('.response-col_description__inner').contains('Experience created successfully').invoke('text').then((op_text) => {
            expect(op_text).to.eq('Experience created successfully');
        });
    });

    // Acceptance test for invalid creation of experience due to invalid id type
    it('return message stating the wrong parameter type for experience creation', () => {
        cy.get('#operations-Experiences-getExperienceById').click();
        cy.get('.try-out').contains('Try it out').click();

        cy.get('td.parameters-col_description > input:nth-child(2)').clear().type(wrongExperienceId);

        cy.get('.execute').click();

        cy.get('table.responses-table')
        .contains('400') 
        .should('exist');

        cy.get('table.responses-table')
        .should('contain.text', 'Invalid experienceId supplied');
    });

    // Acceptance test for successful retrieve of experience
    it('return 200 (the Experience with experienceId was found and retrieved)', () => {
        cy.get('#operations-Experiences-getExperienceById').click();
        cy.get('.try-out').contains('Try it out').click();
        cy.get('td.parameters-col_description > input:nth-child(2)').type(experienceId);
        cy.get('.execute').click();
        cy.get('table.responses-table:nth-child(4) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)').invoke('text').then((op_text) => {expect(op_text).to.eq('200');});
    });

    // Acceptance test for invalid experience Id
    it('not return a "Response body" for an invalid experienceId', () => {
        cy.get('#operations-Experiences-getExperienceById').click();
        cy.get('.try-out').contains('Try it out').click();
        
        cy.get('td.parameters-col_description > input:nth-child(2)').type(wrongExperienceId);

        cy.get('.execute').click();
    
        cy.wait(1000); 
    
        cy.get('table.responses-table')
          .contains('404') 
          .should('exist');
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
        cy.get('input[placeholder="experienceId"]').type('22');
    
        // Execute the request
        cy.get('.execute-wrapper').contains('Execute').click();
    
        // Assert the response status is 200
        cy.get('.response > .response-col_status')
        .contains('200');
      
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
        cy.get('input[placeholder="experienceId"]').type(invalidExperienceId);

        // Execute the request
        cy.get('.execute-wrapper').contains('Execute').click();

        // Assert the expected error response (404 or 400 depending on your API behavior)
        cy.get('.response-col_description__inner')
            .invoke('text')
            .then((op_text) => {
                // Adjust this based on your API's error message for invalid IDs
                expect(op_text).to.eq('successful operationInvalid experience id value'); 
            });
    });


    // Acceptance test for PUT /experiences/{experienceId}/{landmarkId} for successful update of an experience
    it('update an existing experience successfully', () => {
        const updatedExperience = {
            id: 234,
            name: 'Updated experience at the White Tower',
            description: 'I visited again, and it was even better!',
            landmarkId: 124
        };

        cy.request({
            method: 'PUT',
            url: `/experiences/${updatedExperience.id}/${updatedExperience.landmarkId}`,
            body: updatedExperience
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(updatedExperience.id);
            expect(response.body.name).to.eq(updatedExperience.name);
            expect(response.body.description).to.eq(updatedExperience.description);
            expect(response.body.landmarkId).to.eq(updatedExperience.landmarkId);
        });
    });

    // Acceptance test for PUT /experiences/{experienceId}/{landmarkId} for update failure due to invalid id type
    it('return 400 if the update contains invalid data', () => {
        const invalidExperience = {
            id: "234", // Invalid id type
            name: "newExperience",
            description: "Best experience of my life",
            landmarkId: "134", // Invalid id type
        };

        cy.request({
            method: 'PUT',
            url: `/experiences/234/124`,
            body: invalidExperience,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });
});
