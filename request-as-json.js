// In it, create a function called requestJson that takes a URL and a callback function as parameters.

// In your function, do the following:

// Using the request library, make a request to the URL that you were provided.

// When you receive the response: a. If there is an error, call the callback function 
// and pass it the error as the first parameter b. If there is no error, move to step 3

// Use JSON.parse inside a try/catch block to parse the response: a. If there was an error 
// parsing JSON, call the callback function and pass it the same error as the first parameter b. 
// If there was no error parsing the JSON, call the callback function and pass it a 
// null error as the first parameter, and the parsed response as the second parameter
var request = require('request');

function requestJson(url, cb) {
    request(url, function(err, input) {
        if(err) { cb(err); }
        
        else {
                try {
                cb(null, JSON.parse(input.body));   
                }
                catch(error) {
                    cb(error);
                }
                
             }
    });
}
exports.requestJson = requestJson;
