const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');

const DansIp = sequelize.define('DansIp', {
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

DansIp.associate = function(models) {
    DansIp.hasOne(models.BlacklistedIp);
    DansIp.belongsTo(models.DansApiCalls)
}

module.exports = DansIp;

