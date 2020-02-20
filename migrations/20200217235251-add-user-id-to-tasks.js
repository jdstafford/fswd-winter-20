"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("tasks", "userId", Sequelize.INTEGER);
    },

    down: queryInterface => {
        return queryInterface.removeColumn("tasks", "userId");
    }
};
