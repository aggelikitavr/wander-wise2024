const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../../index.js');


test.before(async (t) => {
    // Run the server before testing
    t.context.server = http.createServer(app)
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType : "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    // Close the server after testing
    t.context.server.close();
});