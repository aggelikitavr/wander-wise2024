'use strict';


/**
 * See/Interact interactive map
 * This can only be done by the logged-in user.
 *
 * returns Interactive_map
 **/
exports.interactive_map = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Center of Thessaloniki",
  "details" : "Located near the city center, the White Tower is...",
  "id" : 10,
  "area_shown" : [ {
    "description" : "Entity description here",
    "entity_id" : 1
  }, {
    "description" : "Entity description here",
    "entity_id" : 1
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

