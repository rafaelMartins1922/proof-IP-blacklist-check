const {DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    salt: {
        type: DataTypes.STRING,
    },
    hash: {
        type: DataTypes.STRING,
    },
});

User.associate = function(models) {
    User.hasMany(models.BlacklistedIp);
}

module.exports = User;

