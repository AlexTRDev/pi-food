const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("step", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
}