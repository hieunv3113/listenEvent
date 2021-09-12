const config = require("./config");

console.log(config);

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = sequelize;

module.exports.createConnection = async () => {
  await sequelize.authenticate();
};

module.exports.closeConnection = async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error(error.message);
  }
  process.exit(0);
};
