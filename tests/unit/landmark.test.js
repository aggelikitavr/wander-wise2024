const test = require('c8 ava');
const { setup, teardown } = require('../helpers/setup.js');


test.before(setup);
test.after.always(teardown);

test('POST /landmarks creates a new Landmark', async (t) => {
    const { got } = t.context;
    const newLandmark = {
        'id' : 4,
        'name' : 'Buda Castle',
        'details' : 'Buda Castle is a historic royal palace in Budapest, Hungary.',
        'location' : ['47.4979° N', '19.0399° E'],
        'photos' : {
            'id' : 124,
            'name' : 'Top view of the castle.',
            'date' : '21st of November 2024',
            'image' : [0, 255],
        },
        'reviews' : {
            'review_id' : 24,
            'date' : '21st of November 2024',
            'numOfStars' : 4,
            'review_text' : 'The view of the city is amazing from up there!',
            'comments' : 'Very helpful!',
        },
    };

    const response = await got.post('landmarks', { json: newLandmark });
    t.is(response.statusCode, 201);
    t.is(response.body.id, 4);
    t.is(response.body.name, 'Buda Castle');
    t.is(response.body.details, 'Buda Castle is a historic royal palace in Budapest, Hungary.');
    t.is(response.body.location.length, 2);
    t.deepEqual(response.body.location, ['47.4979° N', '19.0399° E']);
    t.is(response.body.photos.id, 124);
    t.is(response.body.photos.name, 'Top view of the castle.');
    t.is(response.body.photos.date, '21st of November 2024');
    t.deepEqual(response.body.photos.image, [0, 255]);
    t.is(response.body.reviews.review_id, 24);
    t.is(response.body.reviews.date, '21st of November 2024');
    t.is(response.body.reviews.numOfStars, 4);
    t.is(response.body.reviews.review_text, 'The view of the city is amazing from up there!');
    t.is(response.body.reviews.comments, 'Very helpful!');
});

test('POST /landmarks with a wrong attribute type fails to create a new Landmark', async (t) => {
    const { got } = t.context;
    const newWrongLandmark = {
        'id': 4,
        'name': 'Buda Castle',
        'details': 'Buda Castle is a historic royal palace in Budapest, Hungary',
        'location': [
            47.4979,
            '19.0399° E'
        ],
    };

    try {
        await got.post('landmarks', {
            json: newWrongLandmark,
            responseType: 'json',
        });
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});

test('POST /landmarks with a wrong attribute name fails to create a new Landmark', async (t) => {
    const { got } = t.context;
    const newWrongLandmark = {
        'idd': '4',
        'name': 'Buda Castle',
        'details': 'Buda Castle is a historic royal palace in Budapest, Hungary',
        'location': [
            '47.4979° N',
            '19.0399° E'
        ],
    };

    try {
        await got.post('landmarks', {
            json: newWrongLandmark,
            responseType: 'json',
        });
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});

test('GET /landmarks/{landmarkId} returns a Landmark with id equal to landmarkId', async (t) => {
    const { got } = t.context;

    const response = await got.get('landmarks/' + '4');
    t.is(response.statusCode, 200);
    t.is(response.body.id, 4);
    t.is(response.body.name, 'Buda Castle');
    t.is(response.body.details, 'Buda Castle is a historic royal palace in Budapest, Hungary.');
    t.is(response.body.location.length, 2);
    t.deepEqual(response.body.location, ['47.4979° N', '19.0399° E']);
    t.is(response.body.photos.id, 124);
    t.is(response.body.photos.name, 'Top view of the castle.');
    t.is(response.body.photos.date, '21st of November 2024');
    t.deepEqual(response.body.photos.image, [0, 255]);
    t.is(response.body.reviews.review_id, 24);
    t.is(response.body.reviews.date, '21st of November 2024');
    t.is(response.body.reviews.numOfStars, 4);
    t.is(response.body.reviews.review_text, 'The view of the city is amazing from up there!');
    t.is(response.body.reviews.comments, 'Very helpful!');
});

test('GET /landmarks/{landmarkId} returns error 404 if landmarkId does not exist', async (t) => {
    const { got } = t.context;

    try {
        await got.get('landmarks/5', {
            responseType: 'json',
        });
        t.fail();
    } catch (error) {
        t.is(error.response.statusCode, 404);
    }
});

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

