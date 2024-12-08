
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
