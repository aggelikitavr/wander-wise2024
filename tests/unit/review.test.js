const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');

test.before(setup);
test.after.always(teardown);

// Test for DELETE /reviews/:reviewId
test('DELETE /reviews/:reviewId deletes a review', async (t) => {
    const { got } = t.context;
    const reviewId = 23;
    const landmarkId = 348;
    // Debugging: Verify the URL being used
    console.log(`Deleting review: reviewId=${reviewId}, landmarkId=${landmarkId}`);

    // Make the DELETE request
    const response = await got.delete(`landmarks/${landmarkId}/reviews/${reviewId}`);

    console.log(response.body);

    // Validate response
    t.is(response.statusCode, 200); // Expecting No Content
});