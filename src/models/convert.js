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
  amount: {
    type: DataTypes.INTEGER,
    field: "amount",
  },
};

const config = {
  sequelize: database,
  modelName: "Convert",
  tableName: "convert",
  underscored: true,
};

class Convert extends BaseModel {
  static associate(models) {}
}

Convert.init(fields, config);

module.exports = Convert;
