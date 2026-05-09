const express = require("express");

const router = express.Router();

const {
  createBooking,
  customerBookings,
  vendorBookings,
  acceptBooking,
  deliverBooking,
} = require("../controllers/bookingController");


router.post("/", createBooking);

router.get("/customer/:id", customerBookings);

router.get("/vendor", vendorBookings);

router.put("/:id/accept", acceptBooking);

router.put("/:id/deliver", deliverBooking);

module.exports = router;