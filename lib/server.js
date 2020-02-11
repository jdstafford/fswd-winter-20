"use strict";

var express = require("express"),
    morgan = require("morgan"),
    models = require("../models");

var bodyParser = require("body-parser");

// Create the express application object
var app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));

/* istanbul ignore next */
if (process.env.NODE_ENV !== "test") {
    // Setup the loggin format, depending on running environment
    app.use(
        morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")
    );
}

// Add the static middleware, pointed at the ./public directory
app.use(express.static("public"));

app.get("/", (request, response) =>
    response.render("index", { name: "world" })
);

app.get("/tasks", async (request, response) => {
    const tasks = await models.Task.findAll();
    // response.send(tasks.map(task => task.name).join(", "));
    response.render("tasks", { tasks });
});

app.post("/tasks", async (request, response) => {
    const task = await models.Task.create({ name: request.body.name });
    response.redirect("/tasks");
});

app.get("/tasks/:id", async (request, response) => {
    const task = await models.Task.findByPk(request.params.id);
    if (task) {
        response.send(JSON.stringify(task));
    } else {
        response.sendStatus(404);
    }
});

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
    });
});

// allow other modules to use the server
module.exports = app;
