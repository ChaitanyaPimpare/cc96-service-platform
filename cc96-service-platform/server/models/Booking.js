const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {

  vendorId: {
    type: DataTypes.INTEGER,
  },

  status: {
    type: DataTypes.ENUM(
      "pending",
      "accepted",
      "delivered"
    ),

    defaultValue: "pending",
  },
});

module.exports = Booking;