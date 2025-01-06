'use strict';

// Required dependencies
var utils = require('../utils/writer.js');
var InteractiveMap = require('../service/InteractiveMapService');

/**
 * Handles the interactive map request
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
module.exports.interactive_map = function interactive_map(req, res, next) {
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
