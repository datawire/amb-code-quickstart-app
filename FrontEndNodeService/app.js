var argv = require('minimist')(process.argv.slice(2));
var express = require("express");

const environment = "cloud"
const recordCount = 99999999999

console.log(argv);

var color = String(argv.c);

var app = express();

app.get("/color", (req, res, next) => {
  res.json(color);
 });

app.get("/environment", (req, res, next) => {
  res.json(environment);
 });

app.get("/recordCount", (req, res, next) => {
  res.json(recordCount);
 });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
