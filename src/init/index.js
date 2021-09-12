require("dotenv").config({ path: ".env" });

const { createConnection, closeConnection } = require("../database");
const sequelize = require("../database");

createConnection()
  .then(async () => {
    try {
      const models = require("../models");
      models.createAssociate();

      await sequelize.sync({ force: true });

      console.log("Success");
    } catch (error) {
      console.error(error.message);
      console.error(error.errors);
      await t.rollback();
    }

    closeConnection();
  })
  .catch((error) => {
    console.log("Unable to connect to the database");
    console.error(error.message);
    process.exit(0);
  });
