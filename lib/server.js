"use strict";

var express = require("express"),
    morgan = require("morgan");

var bodyParser = require('body-parser');

// Create the express application object
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));

/* istanbul ignore next */
if (process.env.NODE_ENV !== "test") {
    // Setup the loggin format, depending on running environment
    app.use(
        morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")
    );
}

// Add the static middleware, pointed at the ./public directory
app.use(express.static('public'));

app.get("/", (request, response) => response.render("index",
    { name: 'world' }
));
app.get("/:name", (request, response) =>
    response.render("index", {
        name: request.params.name,
        inseam: request.query.inseam
    })
);

app.post("/:name", (request, response) => {
    response.render("index", {
        name: request.params.name,
        inseam: request.body.inseam
    })
});

// allow other modules to use the server
module.exports = app;
