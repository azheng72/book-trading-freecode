'use strict'
var request=require("request");

module.exports = function(set_parameters, callback) {
    let apiURL='https://www.googleapis.com/books/v1/volumes?q='+ set_parameters + '&maxResults=1&key='+process.env.GOOGLE_API_KEY;
    request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });

};