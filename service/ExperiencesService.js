'use strict';


/**
 * Create an experience
 * FR5: Create an Experience 
 *
 * body Experience Created experience object (optional)
 * returns Experience
 **/
exports.createExperience = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "landmarkId" : 124,
  "name" : "My experience at the White Tower",
  "description" : "I had so much fun at the White Tower, because ...",
  "id" : 234
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create an experience
 * FR5: Create an Experience 
 *
 * body Experience Created experience object (optional)
 * returns Experience
 **/
exports.createExperience = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "landmarkId" : 124,
  "name" : "My experience at the White Tower",
  "description" : "I had so much fun at the White Tower, because ...",
  "id" : 234
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete an experience
 * delete an experience
 *
 * experienceId Long Experience id to delete
 * no response value expected for this operation
 **/
exports.deleteExperience = function(experienceId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get experience by experience id
 *
 * experienceId Long The name that needs to be fetched. Use 4 for testing. 
 * returns Experience
 **/
exports.getExperienceById = function(experienceId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "landmarkId" : 124,
  "name" : "My experience at the White Tower",
  "description" : "I had so much fun at the White Tower, because ...",
  "id" : 234
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update experience
 * This can only be done by the logged in user.
 *
 * body Experience Update an existent experience in the store (optional)
 * landmarkId Long landmark id that needs to be added
 * experienceId Long experience id
 * no response value expected for this operation
 **/
exports.updateExperience = function(body,landmarkId,experienceId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update experience
 * This can only be done by the logged in user.
 *
 * body Experience Update an existent experience in the store (optional)
 * landmarkId Long landmark id that needs to be added
 * experienceId Long experience id
 * no response value expected for this operation
 **/
exports.updateExperience = function(body,landmarkId,experienceId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

