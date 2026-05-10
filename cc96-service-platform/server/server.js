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