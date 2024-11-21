'use strict';

var utils = require('../utils/writer.js');
var Photos = require('../service/PhotosService');

module.exports.addPhoto = function addPhoto (req, res, next, body, landmarkId) {
  Photos.addPhoto(body, landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePhoto = function deletePhoto (req, res, next, landmarkId, photoId) {
  Photos.deletePhoto(landmarkId, photoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPhotosForLandmark = function getPhotosForLandmark (req, res, next, landmarkId) {
  Photos.getPhotosForLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
