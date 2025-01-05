'use strict';

var utils = require('../utils/writer.js');
var Reviews = require('../service/ReviewsService');

// The function addReview creates a new review related to a specific landmark.
// The landmark, to which the review will refer, is identified by its id and
// the created review is included in body.
module.exports.addReview = function addReview (_, res, next, body, landmarkId) {
  Reviews.addReview(body, landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 201);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};

// The function deleteReview deletes an existing review, identified by its id and associated
// with an exisiting specific landmark also identified by its id.
module.exports.deleteReview = function deleteReview (_, res, next, landmarkId, reviewId) {
  Reviews.deleteReview(landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};

// The function evaluateReview performs the operation of the evaluation of a specific review
// related to a specific landmark.
module.exports.evaluateReview = function evaluateReview (_, res, next, body, landmarkId, reviewId) {
  Reviews.evaluateReview(body, landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response, 201);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};

// The function getReviewById retrieves a specific review, identified by its id and associated with
// a specific landmark also identified by its id.
module.exports.getReviewsById = function getReviewsById ({_, res, next}, landmarkId, reviewId) {
  Reviews.getReviewsById(landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};

// The function getReviewsForLandmark retrieves all the reviews related to a specific landmark. 
module.exports.getReviewsForLandmark = function getReviewsForLandmark (_, res, next, landmarkId) {
  Reviews.getReviewsForLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
      next();
    });
};
