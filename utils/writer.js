// Constructor function to create a response object with a status code and data
var ResponsePayload = function(code, payload) {
  this.code = code; // The status code of the response (e.g., 200, 400)
  this.payload = payload; // The actual data to send back
};

// Function to create and return a ResponsePayload object
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload); // Return an object with code and data
};

// Function to send a JSON response to the client
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code; // Holds the HTTP status code
  var payload; // Holds the response data

  // If the first argument is a ResponsePayload, use its code and payload
  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code); // Reuse this function
    return; // Stop here since we called it again
  }

  // Check if the second argument is a number (status code)
  if (arg2 && Number.isInteger(arg2)) {
    code = arg2; // Use this as the status code
  } else {
    // If no second argument, check if the first is a status code
    if (arg1 && Number.isInteger(arg1)) {
      code = arg1; // Use this as the status code
    }
  }

  // Decide what the payload is
  if (code && arg1) {
    payload = arg1; // Use the first argument as the data
  } else if (arg1) {
    payload = arg1; // Use the first argument if there’s no code
  }

  // Default to status code 200 if no code is provided
  if (!code) {
    code = 200;
  }

  // If the payload is an object, convert it to JSON text
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2); // Pretty print the JSON
  }

  // Send the response to the client with the status code and JSON data
  response.writeHead(code, { 'Content-Type': 'application/json' }); // Set headers
  response.end(payload); // Send the data
};
