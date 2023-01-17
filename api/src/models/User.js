const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    identification: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    language: {
      type: DataTypes.ENUM("spanish", "english")
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
