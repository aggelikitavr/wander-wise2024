'use strict';

var utils = require('../utils/writer.js');
var Reviews = require('../service/ReviewsService');

module.exports.addReview = function addReview (req, res, next, body, landmarkId) {
  Reviews.addReview(body, landmarkId)
    .then(function (response) {
      utils.writeJson(res, response,201);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteReview = function deleteReview (req, res, next, landmarkId, reviewId) {
  Reviews.deleteReview(landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response,200);
    })
    .catch(function (response) {
      utils.writeJson(res, response,400);
    });
};

module.exports.evaluateReview = function evaluateReview (req, res, next, body, landmarkId, reviewId) {
  Reviews.evaluateReview(body, landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewsById = function getReviewsById (req, res, next, landmarkId, reviewId) {
  Reviews.getReviewsById(landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewsForLandmark = function getReviewsForLandmark (req, res, next, landmarkId) {
  Reviews.getReviewsForLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
