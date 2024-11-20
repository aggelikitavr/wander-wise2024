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

