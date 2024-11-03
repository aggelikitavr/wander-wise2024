'use strict';


/**
 * Create a landmark
 * FR6: Add landmark 
 *
 * no response value expected for this operation
 **/
exports.createLandmark = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a landmark
 * FR7: Remove landmark 
 *
 * landmarkId Object Landmark id to delete
 * no response value expected for this operation
 **/
exports.deleteLandmark = function(landmarkId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get comment by comment id
 * 
 *
 * landmarkId Object The id that needs to be fetched. Use 348 for testing. 
 * reviewId Object The id that needs to be fetched. Use 23 for testing. 
 * commentId Object The id that needs to be fetched. Use 2 for testing. 
 * no response value expected for this operation
 **/
exports.getCommentById = function(landmarkId,reviewId,commentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get comments for current landmark review
 * FR12: Reply to reviews and comments 
 *
 * landmarkId Object The id that needs to be fetched. Use 348 for testing. 
 * reviewId Object The id that needs to be fetched. Use 23 for testing. 
 * no response value expected for this operation
 **/
exports.getCommentsForReview = function(landmarkId,reviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get landmark by landmark id
 * 
 *
 * landmarkId Object The name that needs to be fetched. Use 348 for testing. 
 * no response value expected for this operation
 **/
exports.getLandmarkById = function(landmarkId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get review by review id
 * FR3: View a review 
 *
 * landmarkId Object The id that needs to be fetched. Use 348 for testing. 
 * reviewId Object The id that needs to be fetched. Use 23 for testing. 
 * no response value expected for this operation
 **/
exports.getReviesById = function(landmarkId,reviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get reviews for the current landmark
 * FR3: View review 
 *
 * landmarkId Object The id that needs to be fetched. Use 348 for testing. 
 * no response value expected for this operation
 **/
exports.getReviewsForLandmark = function(landmarkId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

