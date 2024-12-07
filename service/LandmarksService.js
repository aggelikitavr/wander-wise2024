'use strict';

/**
 * Create a landmark
 * FR6: Add landmark 
 *
 * body Landmark Created landmark object (optional)
 * returns Landmark
 **/
exports.createLandmark = function(body) {
  return new Promise(function(resolve, reject) {

    var examples = {};

    examples['application/json'] = {
      "id" : 4,
      "name" : "Buda Castle",
      "details" : "Buda Castle is a historic royal palace in Budapest, Hungary.",
      "location" : ["47.4979° N", "19.0399° E"],
      "photos" : {
          "id" : 124,
          "name" : "Top view of the castle.",
          "date" : "21st of November 2024",
          "image" : [0, 255],
      },
      "reviews" : {
          "review_id" : 24,
          "date" : "21st of November 2024",
          "numOfStars" : 4,
          "review_text" : "The view of the city is amazing from up there!",
          "comments" : "Very helpful!",
      },
    };

    for (let key in body) {
      if (!(key in examples[Object.keys(examples)[0]])) {
        reject(body);
        break;
      }
    }

    // var newLandmark = {
    //   "id": body.id,
    //   "name": body.name,
    //   "details": body.details,
    //   "location": body.location,
    // }

    // resolve(newLandmark);
    resolve(body);

    // if (Object.keys(newLandmark).length == 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve(body);
    // }
  });
}


/**
 * Delete a landmark
 * FR7: Remove landmark 
 *
 * landmarkId Long Landmark id to delete
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
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * reviewId Long The id that needs to be fetched. Use 23 for testing. 
 * commentId Long The id that needs to be fetched. Use 2 for testing. 
 * returns Landmark
 **/
exports.getCommentById = function(landmarkId,reviewId,commentId) {
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
 * Get comments for current landmark review
 * FR12: Reply to reviews and comments 
 *
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * reviewId Long The id that needs to be fetched. Use 23 for testing. 
 * returns Landmark
 **/
exports.getCommentsForReview = function(landmarkId,reviewId) {
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
 * Get landmark by landmark id
 *
 * landmarkId Long The name that needs to be fetched. Use 348 for testing. 
 * returns Landmark
 **/
exports.getLandmarkById = function(landmarkId) {
  return new Promise(function(resolve, reject) {
    var examples = {};

    examples['application/json'] = {
      "id" : 4,
      "name" : "Buda Castle",
      "details" : "Buda Castle is a historic royal palace in Budapest, Hungary.",
      "location" : ["47.4979° N", "19.0399° E"],
      "photos" : {
          "id" : 124,
          "name" : "Top view of the castle.",
          "date" : "21st of November 2024",
          "image" : [0, 255],
      },
      "reviews" : {
          "review_id" : 24,
          "date" : "21st of November 2024",
          "numOfStars" : 4,
          "review_text" : "The view of the city is amazing from up there!",
          "comments" : "Very helpful!",
      },
    };

    if (landmarkId == examples[Object.keys(examples)[0]].id) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      reject();
    }
  });
}

