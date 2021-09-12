const Delivery = require("../models/delivery");

const Response = require("../common/utils/Response");

const sequelize = require("../database");

const { checkSchema } = require("express-validator");
const { Op } = require("sequelize");

module.exports.getAll = {
  validation: checkSchema({
    page: {
      in: ["query"],
      optional: true,
      toInt: true,
      isInt: true,
    },
    pageSize: {
      in: ["query"],
      optional: true,
      toInt: true,
      isInt: true,
    },
    search: {
      in: ["query"],
      optional: true,
      toString: true,
      isString: true,
    },
  }),

  controller: async (req, res) => {
    const { page, pageSize, search } = req.query;

    const _where = {
      ...(search && {
        [Op.or]: [{ id: { [Op.like]: `%${search}%` } }],
      }),
    };

    const delivery = await Delivery.paginate({
      page,
      pageSize,
      where: _where,
      include: [],
    });

    res
      .status(200)
      .send(new Response({ ...delivery }))
      .end();
  },
};

module.exports.store = {
  controller: async (req, res) => {
    const { address, reward } = req.body;

    req.transaction = await sequelize.transaction();

    await Delivery.safeCreate({
      values: {
        address,
        reward,
      },
      transaction: req.transaction,
    });

    await req.transaction.commit();

    res
      .status(201)
      .send(new Response({ status: 201 }))
      .end();
  },
};
