'use strict';

var utils = require('../utils/writer.js');
var Landmarks = require('../service/LandmarksService');

module.exports.createLandmark = function createLandmark (req, res, next, body) {
  Landmarks.createLandmark(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createLandmark = function createLandmark (req, res, next, body) {
  Landmarks.createLandmark(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteLandmark = function deleteLandmark (req, res, next, landmarkId) {
  Landmarks.deleteLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCommentById = function getCommentById (req, res, next, landmarkId, reviewId, commentId) {
  Landmarks.getCommentById(landmarkId, reviewId, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCommentsForReview = function getCommentsForReview (req, res, next, landmarkId, reviewId) {
  Landmarks.getCommentsForReview(landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getLandmarkById = function getLandmarkById (req, res, next, landmarkId) {
  Landmarks.getLandmarkById(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
