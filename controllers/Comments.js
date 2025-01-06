'use strict';

/**
 * @module CommentsController
 * This module handles API endpoints for managing comments on landmarks and their reviews.
 * It provides functionality to add and delete comments.
 */

const utils = require('../utils/writer.js');
const Comments = require('../service/CommentsService');

/**
 * Add a comment to a specific review of a landmark.
 * 
 * @function addComment
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the pipeline.
 * @param {Object} body - The body of the request, containing the comment details.
 * @param {string} landmarkId - The unique identifier of the landmark.
 * @param {string} reviewId - The unique identifier of the review.
 * @returns {void}
 * @description Adds a comment to a specified review of a landmark. Responds with the added comment details or an error.
 */
module.exports.addComment = function addComment(req, res, next, body, landmarkId, reviewId) {
  Comments.addComment(body, landmarkId, reviewId)
    .then(function (response) {
      // Successfully added the comment
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Handle error while adding the comment
      utils.writeJson(res, response, response.status || 500);
    });
};

/**
 * Delete a comment from a specific review of a landmark.
 * 
 * @function deleteComment
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the pipeline.
 * @param {string} landmarkId - The unique identifier of the landmark.
 * @param {string} reviewId - The unique identifier of the review.
 * @param {string} commentId - The unique identifier of the comment to delete.
 * @returns {void}
 * @description Deletes a specified comment from a review of a landmark. Responds with success confirmation or an error.
 */
module.exports.deleteComment = function deleteComment(req, res, next, landmarkId, reviewId, commentId) {
  Comments.deleteComment(landmarkId, reviewId, commentId)
    .then(function (response) {
      // Successfully deleted the comment
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Handle error while deleting the comment
      utils.writeJson(res, response, response.status || 500);
    });
};
