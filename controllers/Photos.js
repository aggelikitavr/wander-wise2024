'use strict';

var utils = require('../utils/writer.js');
var Photos = require('../service/PhotosService');

// This function is used in the POST/landmarks/{landmarkId}/photos endpoint to add a new photo
// for a specific landmark using landmarkId
module.exports.addPhoto = function addPhoto (_, res, next, body, landmarkId) {
  Photos.addPhoto(body, landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 201); // Photo added successfully
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400); // Error, photo not added
      next();
    });
};

// This function is used in the DELETE/landmarks/{landmarkId}/photos/{photoId} endpoint to delete a photo
// of a specific landmark using landmarkId and photoId
module.exports.deletePhoto = function deletePhoto (_, res, next, data) {
  const { landmarkId, photoId } = data;
  Photos.deletePhoto(landmarkId, photoId)
    .then(function (response) {
      utils.writeJson(res, response, 200); // Photo deleted successfully
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400); // Error, photo not deleted
      next();
    });
};

// This function is used in the GET/landmarks/{landmarkId}/photos endpoint to retrieve photos
// of a specific landmark using landmarkId
module.exports.getPhotosForLandmark = function getPhotosForLandmark (_, res, next, landmarkId) {
  Photos.getPhotosForLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response, 200); // Photo retrieved successfully
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400); // Error, photo not retrieved
      next();
    });
};
