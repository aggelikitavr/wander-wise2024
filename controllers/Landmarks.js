'use strict';

var utils = require('../utils/writer.js');
var Landmarks = require('../service/LandmarksService');

// This function is used in the POST /landmarks endpoint to create the specified Landmark
module.exports.createLandmark = function createLandmark (res, body) {
  Landmarks.createLandmark(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

// This function is used in the DELETE /landmarks/{landmarkId} endpoint to delete the Landmark with the specified id
module.exports.deleteLandmark = function deleteLandmark (res, landmarkId) {
  Landmarks.deleteLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

// This function is used in the GET /landmarks/{landmarkId}/reviews/{reviewId}/comments endpoint to get
// a Comment related to a Review and Landmark with the specified ids
module.exports.getCommentById = function getCommentById (res, landmarkId, reviewId, commentId) {
  Landmarks.getCommentById(landmarkId, reviewId, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// This function is used in the GET /landmarks/{landmarkId}/reviews/{reviewId}/comments endpoint
// to get all Comments related to a Review and Landmark with the specified ids
module.exports.getCommentsForReview = function getCommentsForReview (res, landmarkId, reviewId) {
  Landmarks.getCommentsForReview(landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// This function is used in the GET /landmarks/{landmarkId} endpoint to get the Landmark with the specified id
module.exports.getLandmarkById = function getLandmarkById (res, landmarkId) {
  Landmarks.getLandmarkById(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 404);
    });
};
