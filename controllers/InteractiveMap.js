'use strict';

var utils = require('../utils/writer.js');
var InteractiveMap = require('../service/InteractiveMapService');

module.exports.interactive_map = function interactive_map (_, res, next) {
  InteractiveMap.interactive_map()
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};
