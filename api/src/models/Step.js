const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("step", {
        name: {
            type: DataTypes.STRING(900),
            allowNull: false,
        }
    })
}