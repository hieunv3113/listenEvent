"use strict";
const database = require("../database");
const BaseModel = require("../common/utils/BaseModel");

const { DataTypes } = require("sequelize");

const fields = {
  address: {
    type: DataTypes.STRING,
    field: "address",
  },
  nftId: {
    type: DataTypes.INTEGER,
    field: "nftId",
  },
};

const config = {
  sequelize: database,
  modelName: "Crafting",
  tableName: "crafting",
  underscored: true,
};

class Crafting extends BaseModel {
  static associate(models) {}
}

Crafting.init(fields, config);

module.exports = Crafting;
