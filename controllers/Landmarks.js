'use strict';

var utils = require('../utils/writer.js');
var Landmarks = require('../service/LandmarksService');

// This function is used in the POST /landmarks endpoint to create the specified Landmark
module.exports.createLandmark = function createLandmark (_, res, next, body) {
  Landmarks.createLandmark(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};

// This function is used in the DELETE /landmarks/{landmarkId} endpoint to delete the Landmark with the specified id
module.exports.deleteLandmark = function deleteLandmark (_, res, next, landmarkId) {
  Landmarks.deleteLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};

// This function is used in the GET /landmarks/{landmarkId}/reviews/{reviewId}/comments endpoint to get
// a Comment related to a Review and Landmark with the specified ids
module.exports.getCommentById = function getCommentById (_, res, landmarkId, next, reviewId, commentId) {
  Landmarks.getCommentById(landmarkId, reviewId, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

// This function is used in the GET /landmarks/{landmarkId}/reviews/{reviewId}/comments endpoint
// to get all Comments related to a Review and Landmark with the specified ids
module.exports.getCommentsForReview = function getCommentsForReview (_, res, next, landmarkId, reviewId) {
  Landmarks.getCommentsForReview(landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

// This function is used in the GET /landmarks/{landmarkId} endpoint to get the Landmark with the specified id
module.exports.getLandmarkById = function getLandmarkById (_, res, next, landmarkId) {
  Landmarks.getLandmarkById(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 404);
      next();
    });
};
