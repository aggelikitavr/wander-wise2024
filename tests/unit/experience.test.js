
const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');

test.before(setup);
test.after.always(teardown);

// Test for DELETE /experience/:experienceId
test('DELETE /experiences/:experienceId deletes an experience', async (t) => {
    const { got } = t.context;

    const experienceId = 22;

    // Make the DELETE request
    const response = await got.delete(`experiences/${experienceId}`);

    console.log(response.body);

    // Validate response
    t.is(response.statusCode, 200); // Expecting No Content

  
});

// Test for DELETE /experiences/:experienceId with an invalid ID
test('DELETE /experiences/:experienceId returns 404 for non-existent experience', async (t) => {
    const { got } = t.context;

    const invalidExperienceId = 9999; // Non-existent experience ID

    // Make the DELETE request for a non-existent experience
    const error = await t.throwsAsync(() => got.delete(`experiences/${invalidExperienceId}`), { instanceOf: got.HTTPError });

    // Validate response
    t.is(error.response.statusCode, 400); // Expecting 404 Not Found

});
