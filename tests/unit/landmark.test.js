const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');

// Set up and tear down hooks for running before and after the tests
test.before(setup);
test.after.always(teardown);

// Test for DELETE /landmarks/:landmarkId with an existing landmark
test('DELETE /landmarks/:landmarkId deletes a landmark', async (t) => {
    const { got } = t.context;
    const landmarkId = 4; // ID of an existing landmark

    // Make the DELETE request for an existing landmark
    const response = await got.delete(`landmarks/${landmarkId}`);
    console.log(response.body); // Log the response body for debugging

    // Validate response for successful deletion (No Content - 200)
    t.is(response.statusCode, 200); // Expecting 200 status code, indicating successful deletion
});

// Test for DELETE /landmarks/:landmarkId for a non-existent landmark
test('DELETE /landmarks/:landmarkId returns 400 for non-existent landmark', async (t) => {
    const { got } = t.context;
    const invalidLandmarkId = 999; // Assume this ID does not exist in the system

    // Make the DELETE request for a non-existent landmark
    const error = await t.throwsAsync(() => got.delete(`landmarks/${invalidLandmarkId}`), { instanceOf: got.HTTPError });

    // Validate that the response status code is 400 (Bad Request) for the non-existent landmark
    t.is(error.response.statusCode, 400); // Expecting 400 status code, indicating bad request
});

// Test for DELETE /landmarks/:landmarkId with an invalid (negative) landmarkId
test('DELETE /landmarks/:landmarkId returns 400 for invalid (negative) landmarkId', async (t) => {
    const { got } = t.context;
    const invalidLandmarkId = -1; // Invalid landmarkId (negative value)

    // Make the DELETE request for a non-existent or invalid landmark ID
    const error = await t.throwsAsync(() => got.delete(`landmarks/${invalidLandmarkId}`), { instanceOf: got.HTTPError });

    // Validate that the response status code is 400 (Bad Request) for the invalid (negative) landmarkId
    t.is(error.response.statusCode, 400); // Expecting 400 status code, indicating bad request due to invalid ID
});
