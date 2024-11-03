'use strict';

var utils = require('../utils/writer.js');
var Photos = require('../service/PhotosService');

module.exports.addPhoto = function addPhoto (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  Photos.addPhoto(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePhoto = function deletePhoto (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var photoId = req.swagger.params['photoId'].value;
  Photos.deletePhoto(landmarkId,photoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPhotosForLandmark = function getPhotosForLandmark (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  Photos.getPhotosForLandmark(landmarkId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
