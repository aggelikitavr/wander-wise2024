'use strict';

// Required dependencies
const utils = require('../utils/writer.js');
const InteractiveMap = require('../service/InteractiveMapService');

/**
 * Handles the interactive map retrieval request.
 * 
 * @param {Object} _ - Unused HTTP request object.
 * @param {Object} res - The HTTP response object used to send the response.
 * @param {Function} _next - Unused middleware function.
 * @description Calls the `interactive_map` service function and processes the promise.
 * On success, sends the interactive map data as JSON. On failure, sends the error response as JSON.
 */
module.exports.interactive_map = function interactive_map(_, res, _next) {
  InteractiveMap.interactive_map()
    .then(function (response) {
      // Send the successful response as JSON
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Send the error response as JSON
      utils.writeJson(res, response);
    });
};
