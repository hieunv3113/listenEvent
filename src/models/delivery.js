"use strict";
const database = require("../database");
const BaseModel = require("../common/utils/BaseModel");

const { DataTypes } = require("sequelize");

const fields = {
  address: {
    type: DataTypes.STRING,
    field: "address",
  },
  reward: {
    type: DataTypes.INTEGER,
    field: "reward",
  },
};

const config = {
  sequelize: database,
  modelName: "Delivery",
  tableName: "delivery",
  underscored: true,
};

class Delivery extends BaseModel {
  static associate(models) {}
}

Delivery.init(fields, config);

module.exports = Delivery;
