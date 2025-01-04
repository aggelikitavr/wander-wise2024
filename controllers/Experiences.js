'use strict';

var utils = require('../utils/writer.js');
var Experiences = require('../service/ExperiencesService');

// This function is used in the POST/experiences endpoint and creates a new experience
module.exports.createExperience = function createExperience (_, res, next, body) {
  Experiences.createExperience(body)
    .then(function (response) {
      utils.writeJson(res, response, 201); // Experience created successfully
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400); //Error, experience not created
      next();
    });
};

// This function is used in the DELETE/experiences/{experienceId} endpoint and deletes an experience using experienceId
module.exports.deleteExperience = function deleteExperience (_, res, next, experienceId) {
  Experiences.deleteExperience(experienceId)
    .then(function (response) {
      utils.writeJson(res, response, 200); // Experience deleted successfully
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response,400); // Error, experience not deleted
      next();
    });
};

// This function is used in the GET/experiences/{experienceId} endpoint and retrieves an existing experience using experienceId
module.exports.getExperienceById = function getExperienceById (_, res, next, experienceId) {
  Experiences.getExperienceById(experienceId)
    .then(function (response) {
      utils.writeJson(res, response, 200); // Experience retrieved successfully
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400); // Error, experience not retrieved
      next();
    });
};

// This function is used in the PUT/experiences endpoint to update an existing experience
module.exports.updateExperience = function updateExperience(_, res, next, body, data) {
  const { landmarkId, experienceId } = data;

  Experiences.updateExperience(body, landmarkId, experienceId)
    .then(function (response) {
      utils.writeJson(res, response, 200); // Experience updated successfully
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400); // Error, experience not updated
      next();
    });
};
