const Convert = require("../models/convert");

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

    const converts = await Convert.paginate({
      page,
      pageSize,
      where: _where,
      include: [],
    });

    res
      .status(200)
      .send(new Response({ ...converts }))
      .end();
  },
};

module.exports.store = {
  controller: async (req, res) => {
    const { address, nftId, amount } = req.body;

    req.transaction = await sequelize.transaction();

    await Convert.safeCreate({
      values: {
        address,
        nftId,
        amount,
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
