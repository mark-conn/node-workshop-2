//     * Create a file `library/synonyms.js`
//     * In this file, create and export a **constructor function** called `SynonymAPI`. It takes an api key as parameter and 
//       sets it on the new object
//     * In the prototype of `SynonymAPI`, add a function `getSynonyms`. It takes a word and a callback. It makes a request to the 
//       web api and gives back the results **as an object** to the callback function.
//     * *If there was an error, it should be passed down to the callback*
var request = require('request');
var requestJson = require('./request-as-json.js').requestJson;

function requestPromise(url) {
    return new Promise(function(resolve, reject) {
        requestJson(url, function(err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    });
}

function SynonymAPI(apikey) {
    this.apikey = apikey;
}

// SynonymAPI.prototype.getSynonyms = function(word, callback) {
//     requestJson('http://words.bighugelabs.com/api/2/'+ this.apikey +'/' + word +'/json', function(err, result) {
//         if(err) console.log(err, "callback in prototype");
//         else {
//           console.log(result); 
//         }
//     })
// }

SynonymAPI.prototype.getSynonyms = function(word, callback) {
    return requestPromise('http://words.bighugelabs.com/api/2/'+ this.apikey +'/' + word +'/json').then
    (function(response){
      console.log(response);
    })
    .catch(function(err) {
    console.log('something went wrong with one of the requests:', err);
});
}

    
exports.SynonymAPI = SynonymAPI;
