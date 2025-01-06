'use strict';


/**
 * Create a comment
 * FR1: Add a review 
 *
 * body Review Review
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * reviewId Long The id that needs to be fetched. Use 23 for testing. 
 * no response value expected for this operation
 **/
exports.addComment = function(body,landmarkId,reviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a comment
 *
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * reviewId Long The id that needs to be fetched. Use 23 for testing. 
 * commentId Long The id that needs to be fetched. Use 2 for testing. 
 * no response value expected for this operation
 **/
exports.deleteComment = function(landmarkId,reviewId,commentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

