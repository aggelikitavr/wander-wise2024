'use strict';

var utils = require('../utils/writer.js');
var Comments = require('../service/CommentsService');

module.exports.addComment = function addComment (_, res, next, body, landmarkId, reviewId) {
  Comments.addComment(body, landmarkId, reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

module.exports.deleteComment = function deleteComment (_, res, next, landmarkId, reviewId, commentId) {
  Comments.deleteComment(landmarkId, reviewId, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};
