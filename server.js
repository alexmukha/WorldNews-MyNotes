var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var app = express();
var routes = require("./routes");

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/worldnews-mynotes";

// Connect to the Mongo DB
// Fix DeprecationWarning with followin line:
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false });

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});