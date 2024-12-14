const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');

test.before(setup);
test.after.always(teardown);

// Test for DELETE /experiences/:experienceId with a valid experience ID
test('DELETE /experiences/:experienceId deletes an experience', async (t) => {
    const { got } = t.context;

    const experienceId = 22; // Valid experience ID to delete

    // Make the DELETE request for the valid experience ID
    const response = await got.delete(`experiences/${experienceId}`);

    console.log(response.body); // Log the response body for debugging

    // Validate that the response status code is 200, indicating successful deletion
    t.is(response.statusCode, 200); // Expecting 200 OK for successful deletion
});

// Test for DELETE /experiences/:experienceId with a non-existent experience ID
test('DELETE /experiences/:experienceId returns 400 for non-existent experience', async (t) => {
    const { got } = t.context;

    const invalidExperienceId = 9999; // Non-existent experience ID

    // Make the DELETE request for the non-existent experience ID
    const error = await t.throwsAsync(
        () => got.delete(`experiences/${invalidExperienceId}`),
        { instanceOf: got.HTTPError } // Expecting an HTTPError to be thrown
    );

    // Validate that the response status code is 400, indicating bad request
    t.is(error.response.statusCode, 400); // Expecting 400 Bad Request for non-existent experience
});

// Test for DELETE /experiences/:experienceId with an out-of-bounds (negative) experience ID
test('DELETE /experiences/:experienceId returns 400 for out-of-bounds ID', async (t) => {
    const { got } = t.context;

    const outOfBoundsExperienceId = -1; // Invalid (out-of-bounds) experience ID (negative value)

    // Debugging: Verify the URL being used for the out-of-bounds experience ID
    console.log(`Attempting to delete an experience with out-of-bounds ID: ${outOfBoundsExperienceId}`);

    // Make the DELETE request for an out-of-bounds experience ID
    const error = await t.throwsAsync(
        () => got.delete(`experiences/${outOfBoundsExperienceId}`),
        { instanceOf: got.HTTPError } // Expecting an HTTPError to be thrown for invalid ID
    );

    // Validate that the response status code is 400, indicating bad request
    t.is(error.response.statusCode, 400); // Expecting 400 Bad Request for out-of-bounds experience ID
});
