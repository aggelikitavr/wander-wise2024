const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');

test.before(setup);
test.after.always(teardown);

// Test for DELETE /landmarks/:landmarkId with an existing landmark
test('DELETE /landmarks/:landmarkId deletes a landmark', async (t) => {
    const { got } = t.context;
    const landmarkId = 4;

    // Make the DELETE request for an existing landmark
    const response = await got.delete(`landmarks/${landmarkId}`);
    console.log(response.body);

    // Validate response for successful deletion (No Content - 200)
    t.is(response.statusCode, 200); // Expecting No Content

});

// Test for DELETE /landmarks/:landmarkId for a non-existent landmark
test('DELETE /landmarks/:landmarkId returns 400 for non-existent landmark', async (t) => {
    const { got } = t.context;
    const invalidLandmarkId = 999; // Assume this ID does not exist

    // Make the DELETE request for a non-existent landmark
    const error = await t.throwsAsync(() => got.delete(`landmarks/${invalidLandmarkId}`), { instanceOf: got.HTTPError });

    // Validate response
    t.is(error.response.statusCode, 400); // Check for the 404 status code
   
    
});
