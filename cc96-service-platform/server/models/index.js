const User = require("./User");
const Service = require("./Service");
const Booking = require("./Booking");


// CUSTOMER RELATION
User.hasMany(Booking, {
  foreignKey: "customerId",
});

Booking.belongsTo(User, {
  foreignKey: "customerId",
});


// SERVICE RELATION
Service.hasMany(Booking, {
  foreignKey: "serviceId",
});

Booking.belongsTo(Service, {
  foreignKey: "serviceId",
});

module.exports = {
  User,
  Service,
  Booking,
};