'use strict';

var utils = require('../utils/writer.js');
var Landmarks = require('../service/LandmarksService');

module.exports.createLandmark = function createLandmark (req, res, next) {
  Landmarks.createLandmark()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteLandmark = function deleteLandmark (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  Landmarks.deleteLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCommentById = function getCommentById (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var reviewId = req.swagger.params['reviewId'].value;
  var commentId = req.swagger.params['commentId'].value;
  Landmarks.getCommentById(landmarkId,reviewId,commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCommentsForReview = function getCommentsForReview (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var reviewId = req.swagger.params['reviewId'].value;
  Landmarks.getCommentsForReview(landmarkId,reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getLandmarkById = function getLandmarkById (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  Landmarks.getLandmarkById(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviesById = function getReviesById (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var reviewId = req.swagger.params['reviewId'].value;
  Landmarks.getReviesById(landmarkId,reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewsForLandmark = function getReviewsForLandmark (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  Landmarks.getReviewsForLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
