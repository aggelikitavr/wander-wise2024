'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

// The function createUser creates a new user.
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

// The function createUsersWithListInput a list of users from the input array
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

// The function deleteUser deletes a user by username
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

// The function getUserByName retrieves a user by username
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

// The function loginUser performs the operation of logging in a user
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

// The function logoutUser performs the operation of logging out a user
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

/** 
* The function updateUser performs the operation of updating a user.
* A user can only be updated if the user exists and is logged in as the updateUser method of UserService declares.
*/
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
