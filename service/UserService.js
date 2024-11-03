'use strict';


/**
 * Create user
 * This can only be done by the logged in user.
 *
 * no response value expected for this operation
 **/
exports.createUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates list of users with given input array
 * Creates list of users with given input array
 *
 * no response value expected for this operation
 **/
exports.createUsersWithListInput = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username Object The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user name
 * 
 *
 * username Object The name that needs to be fetched. Use user1 for testing. 
 * no response value expected for this operation
 **/
exports.getUserByName = function(username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs user into the system
 * 
 *
 * username Object The user name for login (optional)
 * password Object The password for login in clear text (optional)
 * no response value expected for this operation
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs out current logged in user session
 * 
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update user
 * This can only be done by the logged in user.
 *
 * username Object name that need to be deleted
 * no response value expected for this operation
 **/
exports.updateUser = function(username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

