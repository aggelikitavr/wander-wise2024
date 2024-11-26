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
    const newReview = {
      review_id: body.review_id,
      review_text: body.review_text,
      date: body.date,
      numOfStars: body.numOfStars || 0,
      comments: body.comments || []
    };
    resolve(newReview);
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
  "review_id" : 23,
  "numOfStars" : 2,
  "comments" : [
    {
      "id": 3,
      "text": "I love the view from up there!",
      "author": "WiseWanderer",
      "date": "9th of July 2024",
    }
    ],
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
        "comments": [
          {
            "id": 1,
            "text": "I agree with this review...",
            "author": "HappyVisitor",
            "date": "16th of November 2023"
          }
        ],
        "date": "15th of November 2023"
      },
      {
        "review_id": 3,
        "review_text": "An unforgettable experience!",
        "numOfStars": 5,
        "comments": [
          {
            "id": 2,
            "text": "The atmosphere was incredible.",
            "author": "WiseWanderer",
            "date": "22th of November 2023"
          },
          {
            "id": 3,
            "text": "A must-visit landmark.",
            "author": "WorldExplorer",
            "date": "22th of November 2023"
          }
        ],
        "date": "20th of November 2023"
      },
      {
        "review_id": 4,
        "review_text": "Not as expected, a bit underwhelming.",
        "numOfStars": 3,
        "comments": [
          {
            "id": 4,
            "text": "Could have been better organized.",
            "author": "LandmarkLover",
            "date": "14th of November 2023"
          },
          {
            "id": 5,
            "text": "Was not as advertised.",
            "author": "WiseWanderer",
            "date": "17th of November 2023"
          }
        ],
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

