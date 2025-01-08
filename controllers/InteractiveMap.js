'use strict';

// Required dependencies
const utils = require('../utils/writer.js');
const InteractiveMap = require('../service/InteractiveMapService');

/**
 * @module InteractiveMapController
 * This module handles API requests related to the interactive map feature.
 */

/**
 * Handles the interactive map retrieval request.
 * 
 * @function interactive_map
 * @param {Object} req - The HTTP request object (unused in this implementation).
 * @param {Object} res - The HTTP response object used to send the response.
 * @param {Function} next - The next middleware function in the pipeline (unused in this implementation).
 * @returns {void}
 * @description Calls the interactive_map service function and processes the returned promise. 
 * On success, sends the interactive map data as JSON. On failure, sends the error response as JSON.
 */
module.exports.interactive_map = function interactive_map(req, res, next) {
  InteractiveMap.interactive_map()
    .then(function (response) {
      // Write the successful response as JSON
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response as JSON
      utils.writeJson(res, response);
    });
};
