'use strict';

var utils = require('../utils/writer.js');
var Comments = require('../service/CommentsService');

module.exports.addComment = function addComment (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var reviewId = req.swagger.params['reviewId'].value;
  Comments.addComment(landmarkId,reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteComment = function deleteComment (req, res, next) {
  var landmarkId = req.swagger.params['landmarkId'].value;
  var reviewId = req.swagger.params['reviewId'].value;
  var commentId = req.swagger.params['commentId'].value;
  Comments.deleteComment(landmarkId,reviewId,commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
