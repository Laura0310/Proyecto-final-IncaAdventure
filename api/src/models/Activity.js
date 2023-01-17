const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Activity', {
    // la columna image viene x relacion
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull:false,
    },
    schedule: {
      type: DataTypes.STRING
    },
    start_at: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end_at:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    allowed_age: {
      type: DataTypes.ENUM("under 13 years old", "everyone" ,"teenagers", "over 18 years old"),
      allowNull: false
    },
    difficulty_level: {
      type: DataTypes.ENUM("kids", "beginners", "advanced", "expert"),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
     type: {
      type: DataTypes.ENUM("mountain", "rafting", "trekking", "exploring"),
      allowNull: false
    }
  });

};
