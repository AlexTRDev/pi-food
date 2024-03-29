const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    healthScore: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    readyInMinutes: DataTypes.STRING
  });
};