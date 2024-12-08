const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');


test.before(setup);
test.after.always(teardown);

test('POST /landmarks/{landmarkId}/reviews/{reviewId}/numOfStars evaluates a review using stars', async (t) => {
    const { got } = t.context;
    var numberOfStars = { 'numOfStars': 4 };

    const response = await got.post('landmarks/4/reviews/23/numOfStars', { json: numberOfStars });
    t.is(response.statusCode, 201);
    t.is(response.body.numOfStars, 4);
});

test('POST /landmarks/{landmarkId}/reviews/{reviewId}/numOfStars returns erro 400 Bad Request, because of wrong type', async (t) => {
    const { got } = t.context;
    var wrongNumberOfStars = { 'numOfStars': '4' };

    try {
        await got.post('landmarks/4/reviews/23/numOfStars', {
            json: wrongNumberOfStars,
            responseType: 'json',
        });
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});

test('POST /landmarks/{landmarkId}/reviews/{reviewId}/numOfStars returns erro 400 Bad Request, because of wrong attribute', async (t) => {
    const { got } = t.context;
    var wrongNumberOfStars = { 'numOfStarss': 4 };

    try {
        await got.post('landmarks/4/reviews/23/numOfStars', {
            json: wrongNumberOfStars,
            responseType: 'json',
        });
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});
