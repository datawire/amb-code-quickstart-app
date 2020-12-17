var argv = require('minimist')(process.argv.slice(2));
var express = require("express");

const location = "cloud"

console.log(argv);
var color = String(argv.c);

var app = express();

app.get("/color", (req, res, next) => {
  res.json(color);
 });

app.get("/location", (req, res, next) => {
  res.json(location);
 });

app.get("/data", (req, res, next) => {
  res.json("Lots of data");
 });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
