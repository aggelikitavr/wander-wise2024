'use strict';

var utils = require('../utils/writer.js');
var Experiences = require('../service/ExperiencesService');

module.exports.createExperience = function createExperience (req, res, next) {
  Experiences.createExperience()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteExperience = function deleteExperience (req, res, next) {
  var experienceId = req.swagger.params['experienceId'].value;
  Experiences.deleteExperience(experienceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getExperienceById = function getExperienceById (req, res, next) {
  var experienceId = req.swagger.params['experienceId'].value;
  Experiences.getExperienceById(experienceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateExperience = function updateExperience (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var experienceId = req.swagger.params['experienceId'].value;
  Experiences.updateExperience(landmarkId,experienceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
