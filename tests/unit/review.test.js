const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');

test.before(setup);
test.after.always(teardown);

// Test for DELETE /reviews/:reviewId with a valid reviewId and landmarkId
test('DELETE /reviews/:reviewId deletes a review', async (t) => {
    const { got } = t.context;
    const reviewId = 23; // Valid reviewId
    const landmarkId = 348; // Valid landmarkId

    // Debugging: Verify the URL being used for deletion
    console.log(`Deleting review: reviewId=${reviewId}, landmarkId=${landmarkId}`);

    // Make the DELETE request to remove the review
    const response = await got.delete(`landmarks/${landmarkId}/reviews/${reviewId}`);

    console.log(response.body); // Log the response body for debugging

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
