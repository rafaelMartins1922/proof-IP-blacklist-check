const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');

const BlacklistedIp = sequelize.define('BlacklistedIp', {
    address: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
});

BlacklistedIp.associate = function(models) {
    BlacklistedIp.belongsTo(models.User);
    BlacklistedIp.belongsTo(models.DansIp);
}

module.exports = BlacklistedIp;

