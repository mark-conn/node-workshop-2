var requestJson = require('./request-as-json.js').requestJson;
var request = require('request');
var SynonymAPI = require('./synonyms.js').SynonymAPI;
var prompt = require('prompt');

//   * **Creating the program**:
//     * Create a file `get-synonyms.js` at the root of your project
//     * Import your module and create an instance using your API key
//     * Prompt the user for a word
//     * Using your API, retrieve the synonyms/antonyms/etc. for the input word
//     * If everything goes well, display all the results to the user in a nice way
//     * **Hint**: to display the results in a nice way, a few NPM modules could be useful, including but not limited to:
//       * `colors`
//       * `cli-table`
//       * `node-emoji`
//   * Add/commit/push



//Your API key is 80f1c44326cdf3ec12c576211667c1b6
var myAPI = new SynonymAPI('80f1c44326cdf3ec12c576211667c1b6');

function requestPromise(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    });
}

function promptPromise(question) {
    return new Promise(function(resolve, reject) {
        prompt.get(question, function(err, answers) {
            if (err) {
                reject(err);
            }
            else {
                resolve(answers);
            }
        });
    });
}

function getUserWord() {
    return (promptPromise('word') 
    .then(function(answer){
        var userAnswer = answer.word;
        
        return myAPI.getSynonyms(userAnswer, function(err, result){
            if(err) console.log(err, 'error at final point');
            else {
                console.log(result);
            }
        });
    })
    );
}
getUserWord();

    


 
