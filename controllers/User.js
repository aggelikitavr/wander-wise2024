'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.createUser = function createUser (_, res, next, body) {
  User.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

module.exports.createUsersWithListInput = function createUsersWithListInput (_, res, next, body) {
  User.createUsersWithListInput(body)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

module.exports.deleteUser = function deleteUser (_, res, next, username) {
  User.deleteUser(username)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

module.exports.getUserByName = function getUserByName (_, res, next, username) {
  User.getUserByName(username)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

module.exports.loginUser = function loginUser ({_, res, next, username, password}) {
  User.loginUser(username, password)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

module.exports.logoutUser = function logoutUser (_, res, next) {
  User.logoutUser()
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};

module.exports.updateUser = function updateUser ({_, res, next, body, username}) {
  User.updateUser(body, username)
    .then(function (response) {
      utils.writeJson(res, response);
      next();
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      next();
    });
};
