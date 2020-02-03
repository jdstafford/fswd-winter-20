"use strict";

var express = require("express"),
    morgan = require("morgan");

// Create the express application object
var app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV !== "test") {
    // Setup the loggin format, depending on running environment
    app.use(
        morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")
    );
}

// Add the static middleware, pointed at the ./public directory
//app.use(express.static('public'));

app.get("/", (request, response) => response.send("Hello world!"));
app.get("/:name", (request, response) =>
    response.send("Hello, " + request.params.name + "!")
);

// allow other modules to use the server
module.exports = app;
