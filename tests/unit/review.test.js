const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');


test.before(setup);
test.after.always(teardown);

test('POST /landmarks/{landmarkId}/reviews/{reviewId}/numOfStars evaluates a review using stars', async (t) => {
    const { got } = t.context;
    var numberOfStars = { 'numOfStars': 4 };

    const response = await got.post('landmarks/4/reviews/23/numOfStars', { json: numberOfStars });
    t.is(response.statusCode, 201);
    t.is(response.body.numOfStars, 4);
});

test('POST /landmarks/{landmarkId}/reviews/{reviewId}/numOfStars returns erro 400 Bad Request, because of wrong type', async (t) => {
    const { got } = t.context;
    var wrongNumberOfStars = { 'numOfStars': '4' };

    try {
        await got.post('landmarks/4/reviews/23/numOfStars', {
            json: wrongNumberOfStars,
            responseType: 'json',
        });
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});

test('POST /landmarks/{landmarkId}/reviews/{reviewId}/numOfStars returns erro 400 Bad Request, because of wrong attribute', async (t) => {
    const { got } = t.context;
    var wrongNumberOfStars = { 'numOfStarss': 4 };

    try {
        await got.post('landmarks/4/reviews/23/numOfStars', {
            json: wrongNumberOfStars,
            responseType: 'json',
        });
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});

test("Unit test: GET /landmarks/{landmarkId}/reviews returns the correct response and status code for correct landmarkId in path", 
    async (t) => {
        
        // Define a valid landmarkId for testing
        const landmarkId=348; // A valid landmarkId according to Swagger UI
        
        const { body, statusCode } = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `GET`});
        
        // test for correct body response and statusCode while happy path
        t.true(Array.isArray(body), 'The response body should be an Array');
        t.is(body.length, 3, 'The response body should include three elements for lanmarkId=348');
        t.is(statusCode, 200, 'The response status code should be 200 for valid landmarkId and successful GET operation');
        
        // Write some tests for some of the review and their properties...

        t.is(body[0].review_id, 2, 'The reviewID of the first review of the Landmark with id 348 should be 2');
        t.is(body[0].numOfStars, 2, 'The numOfStars for the first review of the Landmark with id 348 should be 2');
        t.is(body[2].review_text, "Not as expected, a bit underwhelming.");
        t.true(Array.isArray(body[1].comments), 'The comments of the second review for Landmark with id 348 should be an array');
        
        // The following tests can be implemented not only for the second but also for any review
        t.truthy(body[1].comments.length>0 , 'The comments array of the second review should contain at least one comment');
        t.is(body[1].comments[0].text, "The atmosphere was incredible.");
        t.is(body[1].comments[0].author, "WiseWanderer");
        t.truthy(body[1].date, 'The second review of the Landmark with id 348 should contain a "date" property');
        t.is(body[1].date, "20th of November 2023")
        // The following tests can be implemented not only for the second comment of the third review, but also
        // for any comment of any review
        t.truthy(body[2].comments[1].id, 'The second comment of the third review should contain an "id" property');
        t.truthy(body[2].comments[1].text, 'The second comment of the third review should contain a "text" property');
        t.truthy(body[2].comments[1].author, 'The second comment of the third review should contain an "author" property');
        t.truthy(body[2].comments[1].date, 'The second comment of the third review should contain a "date" property');        
});


test("Unit test: GET /landmarks/{landmarkId}/reviews returns 400 for invalid landmarkId -- Giving a string as landmarkId", async (t) => {
    const landmarkId="id"; // An invalid landmarkId

    const { body, statusCode } = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `GET`, 
        throwHttpErrors: false,
    },
    );

    t.is(statusCode, 400, 'The response status code should be 400 for invalid landmarkId');
    t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object')
    t.truthy(body.message, 'The response body should contain a "message" property');
    t.true(body.message.includes('landmarkId must be integer'), 'The message of the respponse body should contain the string "landmarkId should be integer"');
    
    //Check the errors given
    t.truthy(body.errors, 'The response body should contain an "errors" property');
    t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
    t.true(body.errors.length===1, 'The errors array in response body should have length 1');

    // What does the error refer to?
    t.true(body.errors[0].path.includes('landmarkId'), 'The error should refer to the invalid landmarkId path parameter');
    t.true(body.errors[0].message.includes('must be integer'));

});

test("Unit test: GET /landmarks/{landmarkId}/reviews returns 400 for invalid landmarkId -- Giving a non-positive integer as landmarkId",
    async (t) => {
        const landmarkId=-1; // An invalid landmarkId

        const { body, statusCode } = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `GET`, 
            throwHttpErrors: false,
        },
        );
    
        t.is(statusCode, 400, 'The response status code should be 400 for invalid landmarkId');
        t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object');
        t.truthy(body.message, 'The response body should contain a "message" property');
        t.true(body.message.includes('landmarkId must be >= 1'), 'The message of the respponse body should contain the string "landmarkId should be >= 1"');
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');

        // What does the error refer to?
        t.true(body.errors[0].path.includes('landmarkId'), 'The error should refer to the invalid landmarkId path parameter');
        t.true(body.errors[0].message.includes('must be >= 1'));

});

test("Unit test: GET /landmarks/{landmarkId}/reviews/{reviewId} returns the correct response and status code", 
    async (t) => {
        // Define valid landmarkId, reviewId for testing
        const landmarkId=348; // A valid landmarkId according to Swagger UI
        const reviewId=23; // A valid reviewId according to Swagger UI

        const { body, statusCode } = await t.context.got(`landmarks/${landmarkId}/reviews/${reviewId}`, {method: `GET`});

        // Check if the response (body & status code) has the expected domain.
        t.is(statusCode, 200, 'The response status code should be 200 for valid landmarkId and reviewId and successful GET operation');
        t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object');
        t.truthy(body.review_id, 'The repsonse body should contain a "review_id" property');
        t.truthy(body.date, 'The response body should contain a "date" property');
        t.truthy(body.review_text, 'The response body should contain a "review_text" property');
        t.truthy(body.numOfStars, 'The response body should contain a "numOfStars" property');
        t.truthy(body.comments, 'The response body should contain a "comments" property');

        // Check the values of the properties of response body
        t.is(body.review_id, 23, 'The review_id of the Review should be 23, as given');
        t.is(body.numOfStars, 2);
        t.is(body.date, '15th of November 2023');
        t.is(body.review_text, 'This landmark worths visiting...');
        t.true(Array.isArray(body.comments), 'The comments property of the response body should be an array');
        t.true(body.comments.length===1, 'The length of the array comments should be 1 for the Review with id 23 of the Landmark with id 348');
        t.truthy(body.comments[0].text, 'The first comment for the review  should have a "text" property');
        t.truthy(body.comments[0].author, 'The first comment for the review  should have an "author" property');
        t.truthy(body.comments[0].id, 'The first comment for the review  should have an "id" property');
        t.truthy(body.comments[0].date, 'The first comment for the review  should have a "date" property');
        t.is(body.comments[0].text, "I love the view from up there!");
        t.is(body.comments[0].author, "WiseWanderer", 'The first comment is written by "WiseWanderer"');

});

test("Unit test: GET /landmarks/{landmarkId}/reviews/{reviewId} returns 400 for invalid landmarkId -- Giving a float as landmarkId",
    async (t) => {
        const landmarkId=348.83; // An invalid landmarkId
        const reviewId=23; // A valid reviewId

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews/${reviewId}`, {method: `GET`,
            throwHttpErrors: false,
        },
        );

        t.is(statusCode, 400 ,'The response status code should be 400 for invalid landmarkId');
        t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object');
        t.truthy(body.message , 'The response body should contain a "message" property');
        t.true(body.message.includes('landmarkId must be integer'), 'The message of the response body should contain the string "landmarkId should be integer"');
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    
        // What does the error refer to?
        t.true(body.errors[0].path.includes('landmarkId'), 'The error should refer to the invalid landmarkId path parameter');
        t.true(body.errors[0].message.includes('must be integer'));

});

test("Unit test: GET /landmarks/{landmarkId}/reviews/{reviewId} returns 400 for invalid landmarkId -- Giving a non-positive integer as landmarkId",
    async (t) => {
        const landmarkId=0; // An invalid landmarkId    
        const reviewId=23; // A valid reviewId

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews/${reviewId}`, {method: `GET`,
            throwHttpErrors: false,
        });

        t.is(statusCode, 400, 'The response status code should be 400 for invalid landmarkId');
        t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object');
        t.truthy(body.message, 'The response body should contain a "message" property');
        t.true(body.message.includes('landmarkId must be >= 1', 'The message of the response body should contain the string "landmarkId should be >= 1"'));
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    
        // What does the error refer to?
        t.true(body.errors[0].path.includes('landmarkId'), 'The error should refer to the invalid landmarkId path parameter');
        t.true(body.errors[0].message.includes('must be >= 1'));

});

test("Unit test: GET /landmarks/{landmarkId}/reviews/{reviewId} returns 400 for invalid reviewId -- Giving a string as reviewId",
    async (t) => {
        const landmarkId=348; // A valid landmarkId
        const reviewId="reviewId"; // An invalid reviewId

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews/${reviewId}`, {method: `GET`,
            throwHttpErrors: false,
        },
        );

        t.is(statusCode, 400 ,'The response status code should be 400 for invalid reviewId');
        t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object');
        t.truthy(body.message , 'The response body should contain a "message" property');
        t.true(body.message.includes('reviewId must be integer'), 'The message of the response body should contain the string "reviewId should be integer"');
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    
        // What does the error refer to?
        t.true(body.errors[0].path.includes('reviewId'), 'The error should refer to the invalid reviewId path parameter');
        t.true(body.errors[0].message.includes('must be integer'));

});

test("Unit test: GET /landmarks/{landmarkId}/reviews/{reviewId} returns 400 for invalid reviewId -- Giving a non-positive integer as reviewId",
    async (t) => {
        const landmarkId=348; // A valid landmarkId
        const reviewId=-1; // An invalid reviewId

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews/${reviewId}`, {method: `GET`,
            throwHttpErrors: false,
        });
        
        t.is(statusCode, 400, 'The response status code should be 400 for invalid reviewId');
        t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object');
        t.truthy(body.message, 'The response body should contain a "message" property');
        t.true(body.message.includes('reviewId must be >= 1', 'The message of the response body should contain the string "landmarkId should be >= 1"'));
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    
        // What does the error refer to?
        t.true(body.errors[0].path.includes('reviewId'), 'The error should refer to the invalid reviewId path parameter');
        t.true(body.errors[0].message.includes('must be >= 1'));

});

test("Unit test: POST /landmarks/{landmarkId}/reviews returns 201 for successful creation of a review for a landmark -- The request body contains both required and not required properties",
    async (t) => {
        const landmarkId=348; // A valid landmarkId

        // Declare the request body which contains the data of the new review that will be created.
        // Declare valid data for this test
        const reqBody = {
            review_id: 2,
            review_text: "This landmark worths visiting...",
            date: "15th of November 2023",
            numOfStars: 0,
            comments: []
        };

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `POST`,
        json:reqBody
    });

    t.is(statusCode, 201, 'The response status code should be 201 for valid landmarkId and successful creation of the review');
    t.truthy(body && typeof(body)==='object' && !Array.isArray(body), 'The response body should exist and be an object');
    
    // Check if the response body contains the same data as the request body
    t.truthy(body.review_id, 'The response body should contain a "review_id" property');
    t.truthy(body.review_text, 'The response body should contain a "review_text" property');
    t.truthy(body.date, 'The respponse body should contain a "date" property');
    t.true(body.hasOwnProperty('numOfStars'), 'The response body should contain a "numOfStars" property');
    t.is(body.numOfStars, 0, 'The numOfStars is equal to 0 by default for a review just created');
    t.truthy(body.comments, 'The repsonse body should contain a "comments" property');
    t.true(Array.isArray(body.comments)===true, 'The "comments" property should be an array');
    t.deepEqual(body.comments, [], 'There are not comments for a review that is just created for a Landmark');

    t.deepEqual(reqBody, body, 'The request body and response body should be equal');
    
});

test("Unit test: POST /landmarks/{landmarkId}/reviews returns 201 for successful creation of a review for a landmark -- The request body contains only the required properties",
    async (t) => {
        const landmarkId=348; // A valid landmarkId

        // Declare the request body which contains the data of the new review that will be created.
        // Declare valid data for this test.
        // In this test define the request body without declaring the properties "numOfStars" and "comments",
        // which are not required
        const reqBody = {
            review_id: 8,
            review_text: "I love visiting this place!",
            date: "17th of November 2023",
        };

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `POST`,
        json:reqBody
    });

    t.is(statusCode, 201, 'The response status code should be 201 for valid landmarkId and successful creation of the review');
    t.truthy(body && typeof(body)==='object' && !Array.isArray(body), 'The response body should exist and be an object');
    
    // Check if the response body contains the same data as the request body
    t.truthy(body.review_id, 'The response body should contain a "review_id" property');
    t.truthy(body.review_text, 'The response body should contain a "review_text" property');
    t.truthy(body.date, 'The respponse body should contain a "date" property');
    
    // Nevertheless the request body does not contain the properties "numOfStars" and "comments", the response
    // body should contain these properties initializing them to default values.
    t.true(body.hasOwnProperty('numOfStars'), 'The response body should contain a "numOfStars" property');
    t.is(body.numOfStars, 0, 'The numOfStars is equal to 0 by default for a review just created');
    t.truthy(body.comments, 'The repsonse body should contain a "comments" property');
    t.true(Array.isArray(body.comments)===true, 'The "comments" property should be an array');
    t.deepEqual(body.comments, [], 'There are no comments for a review that is just created for a Landmark');

    // In this case, the request body is different from the response body.
    t.notDeepEqual(reqBody, body, 'The request body and response body should NOT be equal in this case');
    
});

test("Unit test: POST /landmarks/{landmarkId}/reviews returns 400 for providing invalid review data as request body. Unsuccessful review creation for a landmark",
    async (t) => {
        const landmarkId=348; // A valid landmarkId

        // Declare the request body which contains the data of the new review that will be created.
        // Declare invalid review data.
        // In this test, some of the required parameters of the request body are omitted.
        const reqBody = {
            review_text: "This landmark worths visiting...",
            numOfStars: 0,
            comments: []
        };

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `POST`,
        json:reqBody, throwHttpErrors: false
    });

    // Check the status code and the response body for unsuccessful creation of a review.
    t.is(statusCode, 400, 'The response status code should be 400 for invalid review data and unsuccessful creation of a review');
    t.truthy(body && typeof(body)==='object' && !Array.isArray(body), 'The response body should exist and be an object');
    t.truthy(body.message, 'The response body should contain a "message" property');
    t.true(body.message.includes("body must have required property 'review_id'"), "The message of the response body should contain the string: request.body should have required property 'review_id'");
});

test("Unit test: POST /landmarks/{landmarkId}/reviews returns 400 for providing invalid review data as request body. More data and properties in request body than needed -> Unsuccessful review creation for a landmark",
    async (t) => {
        const landmarkId=348; // A valid landmarkId

        // Declare the request body which contains the data of the new review that will be created.
        // Declare invalid review data.
        // In this test, some of the required parameters of the request body are omitted.
        const reqBody = {
            review_id: 2,
            review_text: "This landmark worths visiting...",
            date: "16th of November 2023",
            numOfStars: 0,
            comments: [],
            // Additional properties in request body
            author: "WiseWanderer",
        };

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `POST`,
        json:reqBody, throwHttpErrors: false
    });

    // Check the status code and the response body for unsuccessful creation of a review.
    t.is(statusCode, 400, 'The response status code should be 400 for invalid review data and unsuccessful creation of a review');
    t.truthy(body && typeof(body)==='object' && !Array.isArray(body), 'The response body should exist and be an object');
    t.truthy(body.message, 'The response body should contain a "message" property');
    t.true(body.message.includes("body must NOT have additional properties"), "The message of the response body should contain the string: request.body should NOT have additional properties");
    
    //Check the errors given
    t.truthy(body.errors, 'The response body should contain an "errors" property');
    t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
    t.true(body.errors.length===1, 'The errors array in response body should have length 2');
    
    // What does each error refer to?
    t.true(body.errors[0].path.includes('author'), 'The first error should refer to the additional property author');
    t.true(body.errors[0].message.includes('must NOT have additional properties'));

});

test("Unit test: POST /landmarks/{landmarkId}/reviews returns 400 for providing invalid landmark -> Unsuccessful review creation for a landmark.",
    async (t) => {
        const landmarkId="invalid_landmarkId"; // An valid landmarkId

        // Declare the request body which contains the data of the new review that will be created.
        // Declare invalid review data.
        // In this test, some of the required parameters of the request body are omitted.
        const reqBody = {
            review_id: 2,
            review_text: "This landmark worths visiting...",
            date: "16th of November 2023",
            numOfStars: 0,
            comments: [],
        };

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `POST`,
        json:reqBody, throwHttpErrors: false
    });
    
    // Check the status code and the response body for unsuccessful creation of a review.
    t.is(statusCode, 400, 'The response status code should be 400 for invalid review data and unsuccessful creation of a review');
    t.truthy(body && typeof(body)==='object' && !Array.isArray(body), 'The response body should exist and be an object');
    t.truthy(body.message, 'The response body should contain a "message" property');
    t.true(body.message.includes('landmarkId must be integer'), 'The message of the response body should contain the string "landmarkId should be integer"');

    //Check the errors given
    t.truthy(body.errors, 'The response body should contain an "errors" property');
    t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
    t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    t.true(body.errors[0].path.includes('landmarkId'), 'The first error should refer to the invalid landmarkId path parameter');
    t.true(body.errors[0].message.includes('must be integer'));

});

test("Unit test: POST /landmarks/{landmarkId}/reviews returns 400 for providing invalid landmark and invalid review data as request body -> Unsuccessful review creation for a landmark.",
    async (t) => {
        const landmarkId=-10; // An valid landmarkId

        // Declare the request body which contains the data of the new review that will be created.
        // Declare invalid review data.
        // In this test, some of the required parameters of the request body are omitted.
        const reqBody = {
            review_id: 2,
            // The review_text is omitted
            date: "16th of November 2023",
            numOfStars: 0,
            comments: [],
            // Additional properties in request body
            author: "WiseWanderer",
            linked_landmark_id: -10,
        };

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `POST`,
        json:reqBody, throwHttpErrors: false
    });
    
    // Check the status code and the response body for unsuccessful creation of a review.
    t.is(statusCode, 400, 'The response status code should be 400 for invalid review data and unsuccessful creation of a review');
    t.truthy(body && typeof(body)==='object' && !Array.isArray(body), 'The response body should exist and be an object');
    t.truthy(body.message, 'The response body should contain a "message" property');
    t.true(body.message.includes("body must have required property 'review_text'"), "The message of the response body should contain the string: request.body should NOT have additional properties");
    t.true(body.message.includes('landmarkId must be >= 1'), 'The message of the response body should contain the string "landmarkId must be >=1"');
    
    //Check the errors given
    t.truthy(body.errors, 'The response body should contain an "errors" property');
    t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
    t.true(body.errors.length===2, 'The errors array in response body should have length 4');
    
    // What does each error refer to?
    t.true(body.errors[0].path.includes('landmarkId'), 'The first error should refer to the invalid landmarkId path parameter');
    t.true(body.errors[0].message.includes('must be >= 1'));
    t.true(body.errors[1].path.includes('review_text'), 'The fourth error should refer to the missing property review_text');
    t.true(body.errors[1].message.includes("must have required property 'review_text'"));

});

// Test for DELETE /reviews/:reviewId with a valid reviewId and landmarkId
test('DELETE /reviews/:reviewId deletes a review', async (t) => {
    const { got } = t.context;
    const reviewId = 23; // Valid reviewId
    const landmarkId = 348; // Valid landmarkId

    // Debugging: Verify the URL being used for deletion
    console.log(`Deleting review: reviewId=${reviewId}, landmarkId=${landmarkId}`);

    // Make the DELETE request to remove the review
    const response = await got.delete(`landmarks/${landmarkId}/reviews/${reviewId}`);

    // Validate that the response status code is 200, indicating successful deletion
    t.is(response.statusCode, 200); // Expecting No Content (200 OK) on successful deletion
});

// Test for DELETE /reviews/:reviewId with a missing reviewId (empty string)
test('DELETE /reviews/:reviewId detects error when reviewId is missing', async (t) => {
    const { got } = t.context;
    const landmarkId = 20; // Landmark exists
    const invalidReviewId = ''; // Simulate a missing reviewId (empty string)

    // Debugging: Verify the URL being used for deletion with a missing reviewId
    console.log(`Attempting to delete a review with missing reviewId for landmarkId=${landmarkId}`);

    // Make the DELETE request with an invalid (empty) reviewId
    const error = await t.throwsAsync(
        () => got.delete(`landmarks/${landmarkId}/reviews/${invalidReviewId}`), 
        { instanceOf: got.HTTPError } // Expecting an HTTPError to be thrown
    );

    // Validate the error response status code
    t.is(error.response.statusCode, 405); // Expecting 405 Method Not Allowed (incorrect request format)
});

// Test for DELETE /reviews/:reviewId with an invalid landmarkId (non-existent)
test('DELETE /reviews/:reviewId detects error when landmarkId is invalid', async (t) => {
    const { got } = t.context;
    const reviewId = 14; // Valid reviewId
    const invalidLandmarkId = 9999; // Invalid landmarkId (non-existent)

    // Debugging: Verify the URL being used for deletion with an invalid landmarkId
    console.log(`Attempting to delete a review with invalid landmarkId for /landmarks/${invalidLandmarkId}/reviews/${reviewId}`);

    // Make the DELETE request with an invalid landmarkId
    const error = await t.throwsAsync(
        () => got.delete(`landmarks/${invalidLandmarkId}/reviews/${reviewId}`), 
        { instanceOf: got.HTTPError } // Expecting an HTTPError to be thrown
    );

    // Validate the error response status code
    t.is(error.response.statusCode, 400); // Expecting 400 Bad Request (since the landmark doesn't exist)
});
