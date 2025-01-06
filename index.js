'use strict';

var path = require('path');
var http = require('http');

// var oas3Tools = require('oas3-tools');
const swaggerToolsOas3 = require('swagger-tools-oas3');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
    mock: true
};

// var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var expressAppConfig = swaggerToolsOas3.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
if(require.main===module) {
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
}

module.exports= app;
