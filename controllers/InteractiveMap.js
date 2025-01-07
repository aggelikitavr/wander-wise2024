'use strict';

// Required dependencies
const utils = require('../utils/writer.js');
const InteractiveMap = require('../service/InteractiveMapService');

/**
 * Handles the interactive map request
 * 
 * @param {Object} _ - Unused request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @description Calls the service function and handles the promise response for the interactive map.
 */
module.exports.interactive_map = function interactive_map(_, res, next) {
  // Call the service function and handle the promise response
  InteractiveMap.interactive_map()
    .then(function(response) {
      // On success, write the JSON response
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      // On error, write the error response as JSON
      utils.writeJson(res, response);
    });
};
