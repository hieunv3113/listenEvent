const express = require("express");

const { getAll, store } = require("../../controllers/crafting.controller");

const router = express.Router();

router.get("/", getAll.controller);

router.post("/", store.controller);

module.exports = router;
