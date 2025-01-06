'use strict';


/**
 * Add a photo
 * FR8: Add photos of landmark 
 *
 * body Photo Photo
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * no response value expected for this operation
 **/
exports.addPhoto = function(_) {
  return new Promise(function(resolve, _) {
    resolve();
  });
}


/**
 * Delete a photo added by the user
 * FR9: Remove photos of landmark 
 *
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * photoId Long The id that needs to be fetched. Use 8 for testing. 
 * no response value expected for this operation
 **/
exports.deletePhoto = function(_) {
  return new Promise(function(resolve, _) {
    resolve();
  });
}


/**
 * Get photos for the current landmark
 *
 * landmarkId Long The id that needs to be fetched. Use 348 for testing. 
 * returns Photo
 **/
exports.getPhotosForLandmark = function(_) {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = {
  "date" : "10th of August 2017",
  "image" : [ 255, 255 ],
  "name" : "Top view of the Tower.",
  "id" : 16422
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

