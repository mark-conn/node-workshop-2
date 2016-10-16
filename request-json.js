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