'use strict';


/**
 * Create a review
 * FR1: Add a review 
 *
 * body Review Review
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * no response value expected for this operation
 **/
exports.addReview = function(body,landmarkId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a review created by the user
 * FR2: Delete a review 
 *
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * reviewId Long The id that needs to be fetched. Use 23 for testing. 
 * no response value expected for this operation
 **/
exports.deleteReview = function(landmarkId,reviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Evaluate a review
 * FR10: Evaluate a review 
 *
 * body Review Review
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * reviewId Long The id that needs to be fetched. Use 23 for testing. 
 * no response value expected for this operation
 **/
exports.evaluateReview = function(body,landmarkId,reviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get review by review id
 * FR3: View a review 
 *
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * reviewId Long The id that needs to be fetched. Use 23 for testing. 
 * returns a specific Review related to a specific Landmark
 **/
exports.getReviewsById = function(landmarkId,reviewId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "15th of November 2023",
  "review_id" : 2,
  "numOfStars" : 2,
  "comments" : "I agree with this review...",
  "review_text" : "This landmark worths visiting..."
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get reviews for the current landmark
 * FR3: View review 
 *
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * returns Array of Reviews for a specific Landmark
 **/
exports.getReviewsForLandmark = function(landmarkId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [
      {
        "review_id": 2,
        "review_text": "This landmark worths visiting...",
        "numOfStars": 2,
        "comments": ["I agree with this review..."],
        "date": "15th of November 2023"
      },
      {
        "review_id": 3,
        "review_text": "An unforgettable experience!",
        "numOfStars": 5,
        "comments": ["The atmosphere was incredible.", "A must-visit landmark."],
        "date": "20th of November 2023"
      },
      {
        "review_id": 4,
        "review_text": "Not as expected, a bit underwhelming.",
        "numOfStars": 3,
        "comments": ["Could have been better organized.", "Was not as advertised."],
        "date": "10th of November 2023"
      }
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

