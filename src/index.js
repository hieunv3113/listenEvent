const { createConnection, closeConnection } = require("./database");
const { runEventConvert } = require("./worker/ScanEventKawaiiMinting");
const { runEventDelivery } = require("./worker/ScanEventKawaiiDelivey");
const { runEventCrafting } = require("./worker/ScanEventKawaiiCrafting");

createConnection()
  .then(() => {
    try {
      const models = require("./models");
      models.createAssociate();

      runEventConvert();
      runEventDelivery();
      runEventCrafting();

      const server = require("./server");
      server.createServer();
    } catch (error) {
      console.error(error.message);
      closeConnection();
    }
  })
  .catch((error) => {
    console.log("Unable to connect to the database");
    console.error("111", error.message);
    process.exit(0);
  });
