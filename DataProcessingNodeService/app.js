var argv = require('minimist')(process.argv.slice(2));
var express = require("express");

const environment = "local"
const recordCount = 99999999999


console.log(argv);

var color = String(argv.c);

var app = express();

app.get("/", (req, res, next) => {
  console.log(req);
  res.json("root accessed (DataProcessingNodeService)");
 });

app.get("/color", (req, res, next) => {
  console.log("color accessed");
  res.json(color);
 });

app.get("/environment", (req, res, next) => {
  console.log("environment accessed");
  res.json(environment);
 });

app.get("/recordCount", (req, res, next) => {
  console.log("recordCount accessed");
  res.json(recordCount);
 });

app.listen(3000, () => {
 console.log("Welcome to the DataProcessingNodeService!");
 console.log("Server running on port 3000");
});
