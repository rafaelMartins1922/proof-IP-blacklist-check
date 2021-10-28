const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');

const DansApiCalls = sequelize.define('DansApiCalls', {
    numberOfIps: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

DansApiCalls.associate = function(models) {
    DansApiCalls.hasMany(models.DansIp);
}

module.exports = DansApiCalls;

