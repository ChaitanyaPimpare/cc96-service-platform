const { Booking, Service, User } = require("../models");


// CREATE BOOKING
exports.createBooking = async (req, res) => {

  try {

    const {
      customerId,
      serviceId,
    } = req.body;

    const vendor = await User.findOne({
      where: {
        role: "vendor",
      },
    });

    const booking = await Booking.create({
      customerId,
      serviceId,
      vendorId: vendor?.id,
    });

    res.json({
      message: "Booking created",
      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// CUSTOMER BOOKINGS
exports.customerBookings = async (req, res) => {

  try {

    const bookings = await Booking.findAll({
      where: {
        customerId: req.params.id,
      },

      include: [Service],
    });

    res.json(bookings);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// VENDOR BOOKINGS
exports.vendorBookings = async (req, res) => {

  try {

    const bookings = await Booking.findAll({
      include: [
  Service,
  {
    model: User,
    attributes: [
      "name",
      "email",
      "phone",
    ],
  },
],
    });

    res.json(bookings);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ACCEPT BOOKING
exports.acceptBooking = async (req, res) => {

  try {

    await Booking.update(
      {
        status: "accepted",
      },

      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json({
      message: "Booking accepted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// MARK DELIVERED
exports.deliverBooking = async (req, res) => {

  try {

    await Booking.update(
      {
        status: "delivered",
      },

      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json({
      message: "Service delivered",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};