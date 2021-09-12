const express = require("express");
const router = express.Router();

const convertRouter = require("./api/convert.routes");
const deliveryRouter = require("./api/delivery.routes");
const craftingRouter = require("./api/crafting.routes");

router.use(`/api/converts`, convertRouter);
router.use(`/api/delivery`, deliveryRouter);
router.use(`/api/crafting`, craftingRouter);

module.exports = router;
