const { Service } = require("../models");


// GET SERVICES
exports.getServices = async (req, res) => {

  try {

    const services = await Service.findAll();

    res.json(services);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};