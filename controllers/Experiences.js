'use strict';

var utils = require('../utils/writer.js');
var Experiences = require('../service/ExperiencesService');

module.exports.createExperience = function createExperience (_, res, next, body) {
  Experiences.createExperience(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};

module.exports.deleteExperience = function deleteExperience (_, res, next, experienceId) {
  Experiences.deleteExperience(experienceId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response,400);
      next();
    });
};

module.exports.getExperienceById = function getExperienceById (_, res, next, experienceId) {
  Experiences.getExperienceById(experienceId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};

module.exports.updateExperience = function updateExperience (_, res, next, body, landmarkId, experienceId) {
  Experiences.updateExperience(body, landmarkId, experienceId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};
