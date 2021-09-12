require("dotenv").config();
const Sequelize = require("sequelize");

module.exports = {
  host: process.env.DB_HOST || "127.0.0.1",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1",
  database: process.env.DB_NAME || "kawaii",
  port: process.env.DB_PORT || "13309",
  dialect: "mysql",
  dialectOptions: {
    socketPath: process.env.DB_SOCKET_PATH,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
