'use strict';

var utils = require('../utils/writer.js');
var Experiences = require('../service/ExperiencesService');

module.exports.createExperience = function createExperience (req, res, next, body) {
  Experiences.createExperience(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createExperience = function createExperience (req, res, next, body) {
  Experiences.createExperience(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteExperience = function deleteExperience (req, res, next, experienceId) {
  Experiences.deleteExperience(experienceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getExperienceById = function getExperienceById (req, res, next, experienceId) {
  Experiences.getExperienceById(experienceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateExperience = function updateExperience (req, res, next, body, landmarkId, experienceId) {
  Experiences.updateExperience(body, landmarkId, experienceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateExperience = function updateExperience (req, res, next, body, landmarkId, experienceId) {
  Experiences.updateExperience(body, landmarkId, experienceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
