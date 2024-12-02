const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../../index.js');


test.before(setup);
test.after.always(teardown);
