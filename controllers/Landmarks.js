'use strict';

var utils = require('../utils/writer.js');
var Landmarks = require('../service/LandmarksService');


module.exports.createLandmark = function createLandmark (_, res, _, body) {
  Landmarks.createLandmark(body)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

module.exports.deleteLandmark = function deleteLandmark (_, res, _, landmarkId) {
  Landmarks.deleteLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response,200);
    })
    .catch(function (response) {
      utils.writeJson(res, response,400);
    });
};

module.exports.getCommentById = function getCommentById (_, res, _, landmarkId, reviewId, commentId) {
  Landmarks.getCommentById(landmarkId, reviewId, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCommentsForReview = function getCommentsForReview (_, res, _, landmarkId, reviewId) {
  Landmarks.getCommentsForReview(landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getLandmarkById = function getLandmarkById (_, res, _, landmarkId) {
  Landmarks.getLandmarkById(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 404);
    });
};
