'use strict';

/**
 * Provides an interactive map with details about a specific area. 
 * This functionality is restricted to logged-in users.
 *
 * @function interactive_map
 * @returns {Promise<Object>} A promise resolving to an interactive map object.
 * 
 * Example Response:
 * {
 *   "name": "Center of Thessaloniki",
 *   "details": "Located near the city center, the White Tower is...",
 *   "id": 10,
 *   "area_shown": [
 *     {
 *       "description": "Entity description here",
 *       "entity_id": 1
 *     },
 *     {
 *       "description": "Another entity description",
 *       "entity_id": 2
 *     }
 *   ]
 * }
 */
exports.interactive_map = function () {
  return new Promise(function (resolve) {
    // Sample response example for the interactive map
    const responseExample = {
      name: "Center of Thessaloniki",
      details: "Located near the city center, the White Tower is a historical monument and museum.",
      id: 10,
      area_shown: [
        {
          description: "Historical monument near the coast.",
          entity_id: 1
        },
        {
          description: "Popular tourist spot and cultural landmark.",
          entity_id: 2
        }
      ]
    };

    // Resolving the promise with the example data
    resolve(responseExample);
  });
};
