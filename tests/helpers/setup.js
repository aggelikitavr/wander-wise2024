/*

This file was created to automate the process
of defining a setup and teardown process for
running tests on an HTTP server.

It is useful since every unit test file requires
these actions.

*/

const http = require('http');
const got = require('got');
const app = require('../../index.js');

// Prepares everything before running each test (for example starting the server)
async function setup(t) {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({
        prefixUrl: `http://localhost:${port}`,
        responseType: 'json',
    });
}

// Cleans up after the test
function teardown(t) {
    t.context.server.close();
}

module.exports = { setup, teardown };
