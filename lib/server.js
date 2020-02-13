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

app.post("/tasks/:id/complete", async (request, response) => {
    const task = await models.Task.findByPk(request.params.id);

    await task.markCompleted();

    if (task) {
        response.redirect("/tasks");
    } else {
        response.sendStatus(404);
    }
});

app.get("/register", (request, response) => {
    response.render("register");
});

app.post("/register", async (request, response) => {
    const { email, password, passwordConfirm, name } = request.body;
    const extantUser = await models.User.findOne({ where: { email } });

    console.log(extantUser);
    let newUser;

    if (extantUser) {
        response.render("register", {
            name,
            email,
            message: "User with email already exists"
        });
    } else if (password !== passwordConfirm) {
        response.render("register", {
            name,
            email,
            message: "Passwords must match"
        });
    } else {
        newUser = models.User.create({ name, email, password })
            .then(function () {
                response.redirect("/tasks");
            })
            .catch(function (error) {
                response.render("register", {
                    name,
                    email,
                    message: `Something went wrong: ${error}`
                })
            });
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
