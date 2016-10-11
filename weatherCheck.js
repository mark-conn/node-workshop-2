// Go to Forecast.io API and read the documentation
// Get yourself a free API key
// Remember the Google Geocoding API from yesterday’s workshop

// Using both APIs, complete the following workflow:

// Ask the user for their location

// Retrieve the weather for the user’s location

// Display the current weather as well as the next 5 days weather in a nice way

// Hint: to display the results in a nice way, a few NPM modules could be useful, 
// including but not limited to:

// colors
// cli-table
// node-emoji
// ________________________________________
// forecast API
// https://api.darksky.net/forecast/d60662b550cab39aed199a2492f7684c/[latitude],[longitude]

// time machine API
// https://api.darksky.net/forecast/d60662b550cab39aed199a2492f7684c/[latitude],[longitude],[time]
var prompt = require('prompt');
var request = require('./request-json.js').requestJson;
var emoji = require('node-emoji');
var Table = require('cli-table');
var moment = require('moment');
var colour = require('colour');
colour.mode = 'console'; 

function convertIcon(obj) {
                         switch(obj.icon) {
                             case 'partly-cloudy-night':
                                return'cloud';
                            case 'rain':
                                return 'umbrella';

                            case 'partly-cloudy-day':
                               return'sun_small_cloud';
                            case 'clear-day':
                                return'sunny';
                            case 'fog':
                                return 'fog';
                            default:
                                return 'eggplant'
                         }
                     }
                    
                     var table = new Table ({ head: ["", "Weather".green, "Icon".blue, "Max Temp °F".red] });
                                    


prompt.get('city', function(err, input){

    if(err) { console.log("Oh shit son there's an error"); }
    else {
        
       //request user's city, get an object with lat and long
       request('https://maps.googleapis.com/maps/api/geocode/json?address=' + input.city, 
       function(err, input) {
          if(err) { console.log("well shit..."); }
          else {
             var longLat = input.results[0].geometry['location'];
             //console.log(longLat);
             
             var userLoc = "https://api.darksky.net/forecast/d60662b550cab39aed199a2492f7684c/" + longLat.lat + ',' + longLat.lng + '?exclude=currently,hourly,minutely,alerts,flags';
            //  console.log(userLoc);
             
             //request the forecast for user's city, using the objects lat and lng properties
             request(userLoc,
             function(err, input){
                if(err) { console.log("Error in forecast API request"); }  
                 else {
                     var dailyArr;
                     dailyArr = input.daily.data, null, 4;
                                    
                        dailyArr.forEach(function(obj){
                         
                         var dayOfWeek = new Date(obj.time * 1000);
                         var formattedDay = moment(dayOfWeek).format('dddd');
                         var maxTemp = obj.temperatureMax.toString();
                         var weatherWord = obj.icon.toString();
                 
                             table.push({ [formattedDay]: [weatherWord.cyan, emoji.get(convertIcon(obj)), maxTemp.rainbow] }
                             
                             )
                     })
                  
                     console.log(table.toString());
                  }
             })
          }
       })
    }
})
    

    