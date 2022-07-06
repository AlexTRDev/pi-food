const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("diet", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },{
        timestamps: true,
        createdAt: false,
        updatedAt: 'updateTimestamp'
    })
}