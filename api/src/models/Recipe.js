const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: DataTypes.DECIMAL(3,1),
    image: DataTypes.STRING,
  });
};
