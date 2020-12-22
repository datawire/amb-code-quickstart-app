const argv = require('minimist')(process.argv.slice(2));
const express = require("express");
const axios = require("axios");

const DEFAULT_ENV = "local";
const DEFAULT_COLOR = "blue";
const DEFAULT_DATASTORE_URL = "http://verylargedatastore:8080";
const DEFAULT_PORT = 3000;

console.log("Welcome to the DataProcessingNodeService!");
console.log(argv);

// Configure app via command line params
var color = String(argv.c);
if (color === 'undefined') {
  color = DEFAULT_COLOR;
} 

var datastoreURL = String(argv.d);
if (datastoreURL === 'undefined') {
  datastoreURL = DEFAULT_DATASTORE_URL;
}

var port = String(argv.d);
if (port === 'undefined') {
  port = DEFAULT_PORT;
}


// Configure Express REST API Endpoints
var app = express();

// Root
app.get("/", (req, res, next) => {
  res.json("root endpoint entry (DataProcessingNodeService)");
  console.log(req);
 });

// Color
app.get("/color", (req, res, next) => {
  console.log("color endpoint entry");
  res.json(color);
 });

 // Environment
app.get("/environment", (req, res, next) => {
  console.log("environment endpoint entry");
  res.json(DEFAULT_ENV);
 });

// recordCount (get the number of records via a call to the datastore service)
app.get("/recordCount", (req, res, next) => {
  console.log("recordCount endpoint entry");

  axios.get(datastoreURL + '/recordCount')
    .then(function (response) {    
        console.log(response.data);
        var datastoreRecordCount = response.data;
        res.json(datastoreRecordCount);
    })
    .catch(function (error) {
      console.log(error);
    })
 });

// findMerch (find EdgyCorp merchandise matching search params via datastore service)
app.get("/findMerch", (req, res, next) => {
  console.log("findMerch endpoint entry");

  // extract search params from query string
  var country = req.query.country;
  var season = req.query.season;
  console.log(country);
  console.log(season);

  // generate searchQuery to send to datastore 
  var searchQuery = datastoreURL + '/findMerch?country=' + country + '&season=' + season;

  axios.get(searchQuery)
    .then(function (response) {   
       console.log(response.data);
       res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
});

// Start the Express service
app.listen(port, () => {
 console.log("Server running on port " + port);
});