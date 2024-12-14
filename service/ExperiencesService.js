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
  for (let key in body) {
    if (!(key in examples[Object.keys(examples)[0]])) {
      reject(body);
      break;
    }
  }
  resolve(body);
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
    var examples = {
      'id': 22
    };
    
    if (experienceId == examples.id) {
      resolve();
      console.log("experience deleted successfully!");
    } else {
      reject();
    }
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
    if (experienceId == examples[Object.keys(examples)[0]].id) {
     resolve(examples[Object.keys(examples)[0]]);
    }   else {
      reject();
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
exports.updateExperience = function (body, landmarkId, experienceId) {
  return new Promise(function (resolve, reject) {
    var example = {
      id: experienceId,
      name: "My experience at the White Tower",
      description: "I had so much fun at the White Tower, because ...",
      landmarkId: landmarkId,
    };

    for (let key in body) {
      if (!(key in example)) {
        return reject({
          message: `Invalid field '${key}' in request body.`,
          provided: body,
        });
      }
    }

    if (body.id) {
      example.id = body.id;
    }
    if (body.name) {
      example.name = body.name;
    }
    if (body.description) {
      example.description = body.description;
    }
    if (body.landmarkId) {
      example.landmarkId = body.landmarkId;
    }
    resolve(example);
  });
};

