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
 * returns Landmark
 **/
exports.getReviesById = function(landmarkId,reviewId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reviews" : {
    "date" : "15th of November 2023",
    "review_id" : 2,
    "numOfStars" : 2,
    "comments" : "I agree with this review...",
    "review_text" : "This landmark worths visiting..."
  },
  "name" : "The White Tower",
  "details" : "Located near the city center, the White Tower is...",
  "location" : [ "40.753°N", "40.753°N" ],
  "id" : 124,
  "photos" : {
    "date" : "10th of August 2017",
    "image" : [ 255, 255 ],
    "name" : "Top view of the Tower.",
    "id" : 16422
  }
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
 * returns Landmark
 **/
exports.getReviewsForLandmark = function(landmarkId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reviews" : {
    "date" : "15th of November 2023",
    "review_id" : 2,
    "numOfStars" : 2,
    "comments" : "I agree with this review...",
    "review_text" : "This landmark worths visiting..."
  },
  "name" : "The White Tower",
  "details" : "Located near the city center, the White Tower is...",
  "location" : [ "40.753°N", "40.753°N" ],
  "id" : 124,
  "photos" : {
    "date" : "10th of August 2017",
    "image" : [ 255, 255 ],
    "name" : "Top view of the Tower.",
    "id" : 16422
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

