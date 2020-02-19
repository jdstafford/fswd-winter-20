"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("Tasks", "userId", Sequelize.INTEGER);
    },

    down: queryInterface => {
        return queryInterface.removeColumn("Tasks", "userId");
    }
};
