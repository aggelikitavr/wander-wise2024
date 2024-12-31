'use strict';


/**
 * This is a helper function to create a user example. It does
 * not take any input and it returns a Promise Object, which
 * refers to the user example created.
 * @returns {Promise}
 */
const createUserExample = () => {
  return new Promise(function(resolve, _) {
    // The input `_` was originally the `reject` parameter, which is 
    // intentionally unused in order to avoid violation.
    var examples = {};
    examples['application/json'] = {
  "firstName" : "John",
  "lastName" : "James",
  "password" : "12345",
  "userStatus" : 1,
  "phone" : "12345",
  "id" : 10,
  "email" : "john@email.com",
  "username" : "theUser"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object (optional)
 * returns User
 **/
exports.createUser = function(body) {
  return new Promise(function(_, reject) {
    // Check if parameter `body` is provided
    if (!body) {
      reject(new Error("Body is required."));
      return;
    }
    
    // If `username` is provided properly, create the user
    // and resolve the promise by using createUserExample,
    // which returns a promise
    return createUserExample();
  })
}


/**
 * Creates list of users with given input array
 *
 * body List  (optional)
 * returns User
 **/
exports.createUsersWithListInput = function(body) {
  return new Promise(function(_, reject) {
    // Check if parameter `body` is provided
    if (!body) {
      reject(new Error("Body is required."));
      return;
    }

    // If `body` is provided properly, resolve the promise
    // using createUserExample, which returns a promise
    return createUserExample();
  })
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return new Promise(function(resolve, reject) {
    // Check if parameter `username` is provided
    if (!username) {
      reject(new Error("Username is required."));
      return;
    }

    // If `username` is provided properly, resolve the promise
    resolve();
  });
}


/**
 * Get user by user name
 *
 * username String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
exports.getUserByName = function(username) {
  return new Promise(function(_, reject) {
    // Check if parameter `username` is provided
    if (!username) {
      reject(new Error("Username is required."));
      return;
    }

    // If `username` is provided properly, resolve the promise
    // using createUserExample, which returns a promise
    return createUserExample();
  })
}


/**
 * Logs user into the system
 *
 * username String The user name for login (optional)
 * password String The password for login in clear text (optional)
 * returns String
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    // Check if both parameters `username` and `password` are provided
    if (!username || !password) {
      reject(new Error("Both username and password are required"))
    }

    // If `body` and `username` are provided properly, continue to resolve the promise
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, _) {
    // The input `_` was originally the `reject` parameter, which is 
    // intentionally unused in order to avoid violation.
    resolve();
  });
}


/**
 * Update user
 * This can only be done by the logged in user.
 *
 * body User Update an existent user in the store (optional)
 * username String name that need to be deleted
 * no response value expected for this operation
 **/
exports.updateUser = function(body,username) {
  return new Promise(function(resolve, reject) {
    // Check if both parameters `body` and `username` are provided
    if (!body || !username) {
      reject(new Error("Both body and username are required."));
      return;
    }

    // If `body` and `username` are provided properly, resolve the promise
    resolve();
  });
}
