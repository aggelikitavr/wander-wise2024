/**
 * @module CommentsController
 * This module handles API endpoints related to adding and deleting comments for landmarks and reviews.
 */

'use strict';

var utils = require('../utils/writer.js');
var Comments = require('../service/CommentsService');

/**
 * Add a comment to a specific review of a landmark.
 * 
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the pipeline.
 * @param {Object} body - The body of the request, containing the comment details.
 * @param {string} landmarkId - The unique identifier of the landmark.
 * @param {string} reviewId - The unique identifier of the review.
 * @returns {void}
 */
module.exports.addComment = function addComment (req, res, next, body, landmarkId, reviewId) {
  Comments.addComment(body, landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Delete a comment from a specific review of a landmark.
 * 
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the pipeline.
 * @param {string} landmarkId - The unique identifier of the landmark.
 * @param {string} reviewId - The unique identifier of the review.
 * @param {string} commentId - The unique identifier of the comment to delete.
 * @returns {void}
 */
module.exports.deleteComment = function deleteComment (req, res, next, landmarkId, reviewId, commentId) {
  Comments.deleteComment(landmarkId, reviewId, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
