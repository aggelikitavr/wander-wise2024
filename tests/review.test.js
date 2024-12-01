const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');


test.before(async (t) => {
    // Run the server before testing
    t.context.server = http.createServer(app)
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType : "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    // Close the server after testing
    t.context.server.close();
});

test("Unit test: GET /landmarks/{landmarkId}/reviews returns the correct response and status code for correct landmarkId in path", 
    async (t) => {
        
        // Define a valid landmarkId for testing
        const landmarkId=348; // A valid landmarkId according to Swagger UI
        
        const { body, statusCode } = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `GET`});
        //console.log(body);
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
    t.true(body.message.includes('landmarkId should be integer'), 'The message of the respponse body should contain the string "landmarkId should be integer"');
    
    //Check the errors given
    t.truthy(body.errors, 'The response body should contain an "errors" property');
    t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
    t.true(body.errors.length===1, 'The errors array in response body should have length 1');

    // What does the error refer to?
    t.true(body.errors[0].path.includes('params.landmarkId'), 'The error should refer to the invalid landmarkId path parameter');
    t.true(body.errors[0].message.includes('should be integer'));

});

test("Unit test: GET /landmarks/{landmarkId}/reviews returns 400 for invalid landmarkId -- Giving a non-positive integer as landmarkId",
    async (t) => {
        const landmarkId=-1; // An invalid landmarkId

        const { body, statusCode } = await t.context.got(`landmarks/${landmarkId}/reviews`, {method: `GET`, 
            throwHttpErrors: false,
        },
        );
        //console.log(body)
    
        t.is(statusCode, 400, 'The response status code should be 400 for invalid landmarkId');
        t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object');
        t.truthy(body.message, 'The response body should contain a "message" property');
        t.true(body.message.includes('landmarkId should be >= 1'), 'The message of the respponse body should contain the string "landmarkId should be >= 1"');
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');

        // What does the error refer to?
        t.true(body.errors[0].path.includes('params.landmarkId'), 'The error should refer to the invalid landmarkId path parameter');
        t.true(body.errors[0].message.includes('should be >= 1'));

});

test("Unit test: GET /landmarks/{landmarkId}/reviews/{reviewId} returns the correct response and status code", 
    async (t) => {
        // Define valid landmarkId, reviewId for testing
        const landmarkId=348; // A valid landmarkId according to Swagger UI
        const reviewId=23; // A valid reviewId according to Swagger UI

        const { body, statusCode } = await t.context.got(`landmarks/${landmarkId}/reviews/${reviewId}`, {method: `GET`});
        //console.log(body);

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
        t.true(body.message.includes('landmarkId should be integer'), 'The message of the response body should contain the string "landmarkId should be integer"');
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    
        // What does the error refer to?
        t.true(body.errors[0].path.includes('params.landmarkId'), 'The error should refer to the invalid landmarkId path parameter');
        t.true(body.errors[0].message.includes('should be integer'));

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
        t.true(body.message.includes('landmarkId should be >= 1', 'The message of the response body should contain the string "landmarkId should be >= 1"'));
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    
        // What does the error refer to?
        t.true(body.errors[0].path.includes('params.landmarkId'), 'The error should refer to the invalid landmarkId path parameter');
        t.true(body.errors[0].message.includes('should be >= 1'));

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
        t.true(body.message.includes('reviewId should be integer'), 'The message of the response body should contain the string "reviewId should be integer"');
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    
        // What does the error refer to?
        t.true(body.errors[0].path.includes('params.reviewId'), 'The error should refer to the invalid reviewId path parameter');
        t.true(body.errors[0].message.includes('should be integer'));

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
        t.true(body.message.includes('reviewId should be >= 1', 'The message of the response body should contain the string "landmarkId should be >= 1"'));
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===1, 'The errors array in response body should have length 1');
    
        // What does the error refer to?
        t.true(body.errors[0].path.includes('params.reviewId'), 'The error should refer to the invalid reviewId path parameter');
        t.true(body.errors[0].message.includes('should be >= 1'));

});

test("Unit test: GET /landmarks/{landmarkId}/reviews/{reviewId} returns 400 for invalid landmarkId and reviewId",
    async (t) => {
        const landmarkId=0; // An invalid landmarkId    
        const reviewId=2.5; // An invalid reviewId

        const { body, statusCode} = await t.context.got(`landmarks/${landmarkId}/reviews/${reviewId}`, {method: `GET`,
            throwHttpErrors: false,
        });
        
        t.is(statusCode, 400, 'The response status code should be 400 for invalid landmarkId');
        t.true(body && typeof(body) === 'object' && !Array.isArray(body), 'The response body should be an object');
        t.truthy(body.message, 'The response body should contain a "message" property');
        t.true(body.message.includes('landmarkId should be >= 1', 'The message of the response body should contain the string "landmarkId should be >= 1"'));
        t.true(body.message.includes('reviewId should be integer', 'The message of the response body should contain the string "reviewId should be integer"'));
        //Check the errors given
        t.truthy(body.errors, 'The response body should contain an "errors" property');
        t.true(Array.isArray(body.errors), 'The errors in response body should be an array');
        t.true(body.errors.length===2, 'The errors array in response body should have length 2');
    
        // What do the errors refer to?
        t.true(body.errors[0].path.includes('params.landmarkId'), 'The first error should refer to the invalid landmarkId path parameter');
        t.true(body.errors[0].message.includes('should be >= 1'));
        t.true(body.errors[1].path.includes('params.reviewId'), 'The second error should refer to the invalid reviewId path parameter');
        t.true(body.errors[1].message.includes('should be integer'));

});