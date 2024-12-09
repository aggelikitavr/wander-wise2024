const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');


test.before(setup);
test.after.always(teardown);

// test('POST /landmarks/{landmarkId}/reviews/{reviewId}/numOfStars adds the number of stars for the Review of a Landmark', async (t) => {
//     const { got } = t.context;
//     const updateNumOfStars = {
//         "numOfStars": 5,
//     };

//     const response = await got.post('landmarks/4/reviews/1/numOfStars', { json: updateNumOfStars });
//     t.is(response.statusCode, 201);
//     t.is(response.body.numOfStars, 5);
// });
