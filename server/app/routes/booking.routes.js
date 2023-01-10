module.exports = app => {
  const bookingController = require("../controllers/booking.controller.js");

  var router = require("express").Router();

  router.get("/bookSeats", bookingController.bookSeats);

  router.get("/", bookingController.getAvailableSeats);

  app.use('/api/booking', router);
};
