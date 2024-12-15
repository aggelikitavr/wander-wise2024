const test = require('c8 ava');
const { setup, teardown } = require('../helpers/setup.js');

test.before(setup);
test.after.always(teardown);

// Test for POST /experiences for successful creation of an Experience
test('POST /experiences creates a new Experience', async (t) => {
    const { got } = t.context;
    const newExperience = {
        "id": 234,
        "name": "My experience at the White Tower",
        "description": "I had so much fun at the White Tower, because ...",
        "landmarkId": 124,
    };

    const response = await got.post('experiences', { json: newExperience });
    t.is(response.statusCode, 201);
    t.is(response.body.id, 234);
    t.is(response.body.name, "My experience at the White Tower");
    t.is(response.body.description, "I had so much fun at the White Tower, because ...");
    t.is(response.body.landmarkId, 124);
});

// Test for POST /experiences for invalid creation of experience due to invalid data type
test('POST /experiences with a wrong attribute type fails to create a new Experience', async (t) => {
    const { got } = t.context;
    const newWrongExperience = {
        "id": "234", // 'id' should be a number, but here it's a string
        "name": "My experience at the White Tower",
        "description": "I had so much fun at the White Tower, because ...",
        "landmarkId": 124,
    };

    try {
        await got.post('experiences', {
            json: newWrongExperience,
            responseType: 'json',
        });
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});

// Test for POST /experiences for invalid creation of experience due to wrong id name
test('POST /experiences with a wrong attribute name fails to create a new Experience', async (t) => {
    const { got } = t.context;
    const newWrongExperience = {
        "idd": 234, // 'idd' is not a valid attribute
        "name": "My experience at the White Tower",
        "description": "I had so much fun at the White Tower, because ...",
        "landmarkId": 124,
    };

    try {
        await got.post('experiences', {
            json: newWrongExperience,
            responseType: 'json',
        });
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});

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

// Test for /experiences/{experienceId} for successful retrieve 
test('GET /experiences/{experienceId} successfully retrieves an Experience', async (t) => {
    const { got } = t.context;

    const expectedExperience = {
        id: 234,
        name: "My experience at the White Tower",
        description: "I had so much fun at the White Tower, because ...",
        landmarkId: 124,
    };

    const response = await got.get(`experiences/${expectedExperience.id}`, {
        responseType: 'json',
    });

    t.is(response.statusCode, 200);
    t.is(response.body.id, expectedExperience.id);
    t.is(response.body.name, expectedExperience.name);
    t.is(response.body.description, expectedExperience.description);
    t.is(response.body.landmarkId, expectedExperience.landmarkId);
});

// Test for GET /experiences/{experienceId} for invalid retrieve of experience due to invalid Id type
test('GET /experiences/{experienceId} returns 400 if experienceId has the wrong data type', async (t) => {
    const { got } = t.context;

    const wrongExperienceId = "2002"; // Invalid Id type

    try {
        await got.get(`experiences/${wrongExperienceId}`, {
            responseType: 'json',
        });
        t.fail(); 
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});

// Test for PUT /experiences/{experienceId}/{landmarkId} for successful update of experience
test('PUT /experiences/{experienceId}/{landmarkId} updates an existing Experience', async (t) => {
    const { got } = t.context;
    const updatedExperience = {
        "id": 234,
        "name": "Updated experience at the White Tower",
        "description": "I visited again, and it was even better!",
        "landmarkId": 124,
    };

    const response = await got.put(`experiences/${updatedExperience.id}/${updatedExperience.landmarkId}`, { 
        json: updatedExperience 
    });

    t.is(response.statusCode, 200);
    t.is(response.body.id, 234);
    t.is(response.body.name, "Updated experience at the White Tower");
    t.is(response.body.description, "I visited again, and it was even better!");
    t.is(response.body.landmarkId, 124);
});

// Test for PUT /experiences/{experienceId}/{landmarkId} for failure to update an experience due to invalid data type
test('PUT /experiences/{experienceId}/{landmarkId} returns 400 if the update contains invalid data', async (t) => {
    const { got } = t.context;
    const invalidExperience = {
        id: "not-a-number", // Invalid data type
        name: "Valid name",
        description: "Valid description",
        landmarkId: "not-a-number", // Invalid data type
    };

    try {
        await got.put(`experiences/234/124`, {
            json: invalidExperience,
        });
        t.fail();
    } catch (error) {
        t.is(error.response.statusCode, 400);
    }
});
