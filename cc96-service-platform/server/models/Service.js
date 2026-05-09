const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Service = sequelize.define("Service", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  image: {
    type: DataTypes.STRING,
  },

  price: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Service;