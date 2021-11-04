const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');

const BlacklistedIp = sequelize.define('BlacklistedIp', {
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

BlacklistedIp.associate = function(models) {
    BlacklistedIp.belongsTo(models.DansIp);
}

module.exports = BlacklistedIp;

