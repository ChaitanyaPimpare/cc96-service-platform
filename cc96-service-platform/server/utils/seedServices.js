const { Service } = require("../models");

const seedServices = async () => {

  const existing = await Service.count();

  if (existing > 0) return;

  await Service.bulkCreate([
    {
      title: "Home Cleaning",
      description: "Professional home cleaning service",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952",

      price: 999,
    },

    {
      title: "AC Repair",
      description: "Expert AC repair and maintenance",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4",

      price: 1499,
    },

    {
      title: "Plumbing",
      description: "Quick plumbing solutions",
      image:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",

      price: 799,
    },

    {
      title: "Electrician",
      description: "Certified electricians available",
      image:
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a",

      price: 1199,
    },
  ]);

  console.log("Services Seeded");
};

module.exports = seedServices;