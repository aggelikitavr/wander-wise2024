const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');


test.before(setup);
test.after.always(teardown);

test('POST /landmarks creates a new Landmark', async (t) => {
    const { got } = t.context;
    const newLandmark = {
        "id": 4,
        "name": "Buda Castle",
        "details": "Buda Castle is a historic royal palace in Budapest, Hungary",
        "location": [
            "47.4979° N",
            "19.0399° E"
        ],
    }

    const response = await got.post('landmarks', { json: newLandmark });
    t.is(response.statusCode, 200);
    t.is(response.body.id, 4);
    t.is(response.body.name, 'Buda Castle');
    t.is(response.body.details, 'Buda Castle is a historic royal palace in Budapest, Hungary');
    t.is(response.body.location.length, 2);
    t.deepEqual(response.body.location, ['47.4979° N', '19.0399° E']);
});
