'use strict';

/**
 * @module InteractiveMapService
 * This module handles operations related to viewing and interacting with the interactive map.
 */

/**
 * Retrieves an interactive map.
 * 
 * @function interactive_map
 * @returns {Promise<Object>} A promise that resolves with an example of an interactive map in JSON format.
 * @description This function simulates the retrieval of an interactive map, including metadata and shown areas.
 * Note: This is a stub function for testing and does not connect to an actual database or service.
 */
exports.interactive_map = function () {
  return new Promise(function (resolve) {
    // Example response to simulate successful map retrieval
    const examples = {
      'application/json': {
        "name": "Center of Thessaloniki",
        "details": "Located near the city center, the White Tower is a landmark of Thessaloniki.",
        "id": 10,
        "area_shown": [
          {
            "description": "Entity description here",
            "entity_id": 1
          },
          {
            "description": "Entity description here",
            "entity_id": 2
          }
        ]
      }
    };

    // Resolving the promise with the first example in JSON format
    resolve(examples['application/json']);
  });
};