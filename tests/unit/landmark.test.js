const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');


test.before(setup);
test.after.always(teardown);

// Test for DELETE /landmarks/:landmarkId
test('DELETE /landmarks/:landmarkId deletes a landmark', async (t) => {
    const { got } = t.context;

    const landmarkId = 4;

    // Make the DELETE request
    const response = await got.delete(`landmarks/${landmarkId}`);

    console.log(response.body);

    // Validate response
    t.is(response.statusCode, 200); // Expecting No Content

    // Confirm deletion
    // const fetchResponse = await got(`landmarks/${landmarkId}`, { throwHttpErrors: false });
    // t.is(fetchResponse.statusCode, 400); // Not Found
});
