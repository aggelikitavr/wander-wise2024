'use strict';

var utils = require('../utils/writer.js');
var Reviews = require('../service/ReviewsService');

module.exports.addReview = function addReview (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  Reviews.addReview(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteReview = function deleteReview (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var reviewId = req.swagger.params['reviewId'].value;
  Reviews.deleteReview(landmarkId,reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.evaluateReview = function evaluateReview (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var reviewId = req.swagger.params['reviewId'].value;
  Reviews.evaluateReview(landmarkId,reviewId)
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
  Reviews.getReviesById(landmarkId,reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewsForLandmark = function getReviewsForLandmark (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  Reviews.getReviewsForLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
