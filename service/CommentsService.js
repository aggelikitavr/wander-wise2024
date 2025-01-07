'use strict';

/**
 * @module CommentsService
 * This module handles operations related to creating and deleting comments on landmarks and reviews.
 */

/**
 * Create a comment for a specific review of a landmark.
 * 
 * @function addComment
 * @param {Object} requestBody - (Optional) The request body containing the comment details.
 * @param {number} landmarkId - The unique identifier of the landmark. Use `348` for testing.
 * @param {number} reviewId - The unique identifier of the review. Use `23` for testing.
 * @returns {Promise<void>} A promise that resolves with no response value for this operation.
 * @description Adds a new comment to a specified review of a landmark. 
 * This function is for testing purposes and currently does not perform any actual operation.
 */
exports.addComment = function (requestBody, landmarkId, reviewId) {
  return new Promise(function (resolve) {
    // Simulating successful operation for testing purposes
    resolve();
  });
};

/**
 * Delete a comment from a specific review of a landmark.
 * 
 * @function deleteComment
 * @param {number} landmarkId - The unique identifier of the landmark. Use `348` for testing.
 * @param {number} reviewId - The unique identifier of the review. Use `23` for testing.
 * @param {number} commentId - (Optional) The unique identifier of the comment. Use `2` for testing.
 * @returns {Promise<void>} A promise that resolves with no response value for this operation.
 * @description Deletes a specified comment from a review of a landmark. 
 * This function is for testing purposes and currently does not perform any actual operation.
 */
exports.deleteComment = function (landmarkId, reviewId, commentId) {
  return new Promise(function (resolve) {
    // Simulating successful operation for testing purposes
    resolve();
  });
};
