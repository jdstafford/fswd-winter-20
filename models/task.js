"use strict";
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        "Task",
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            completedAt: DataTypes.DATE
        },
        {}
    );
    // Task.associate = function(models) {
    //   // associations can be defined here
    // };

    Task.prototype.isCompleted = function () {
        return !!this.completedAt;
    };

    Task.prototype.markCompleted = async function () {
        const timeNow = new Date();

        return this.update({
            completedAt: timeNow
        });
    };

    return Task;
};
