const express = require("express");

const cors = require("cors");

require("dotenv").config();

const sequelize =
  require("./config/db");

require("./models");

const authRoutes =
  require("./routes/authRoutes");

const serviceRoutes =
  require("./routes/serviceRoutes");

const bookingRoutes =
  require("./routes/bookingRoutes");

const seedServices =
  require("./utils/seedServices");


const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cc96-service-platform.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());


app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/services",
  serviceRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);


app.get("/", (req, res) => {

  res.send("API Running");

});


sequelize.authenticate()

.then(async () => {

  console.log(
    "PostgreSQL Connected"
  );

  try {

    await sequelize.sync({
      force: true,
    });

    console.log(
      "Database Synced"
    );

    await seedServices();

    console.log(
      "Services Seeded"
    );

  } catch (error) {

    console.log(
      "SYNC ERROR:",
      error
    );
  }

})

.catch((error) => {

  console.log(
    "DB CONNECTION ERROR:",
    error
  );

});


const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});