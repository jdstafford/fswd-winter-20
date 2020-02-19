"use strict";

// code to test
var server = require("./server");
var models = require("../models");

// libraries
var request = require("supertest");

beforeAll(function() {
    return models.sequelize.sync({ force: true });
});

it("should have a test", function() {
    expect(true).toBe(true);
});

describe("server", function() {
    it('should respond with "Hello world!" on /', function() {
        return request(server)
            .get("/")
            .expect(200, /Hello world!/);
    });

    ["David", "John", "Lee"].forEach(function(name) {
        const helloName = new RegExp(`Hello ${name}!`);

        it(
            'should respond with "Hello, ' + name + '!" on /' + name,
            function() {
                return request(server)
                    .get("/" + name)
                    .expect(200)
                    .then(response => {
                        expect(response.text.search(helloName)).toBeGreaterThan(
                            -1
                        );
                    });
            }
        );
    });
});
