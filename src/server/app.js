const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const router = require("../routes");
const fs = require("fs");
const path = require("path");

const {
  STATIC_PATH,
  LOGS_PATH,
  PORT,
  NODE_ENV,
} = require("../common/constants");

const {
  handlerError,
  notFound,
  databaseError,
} = require("../middleware/error");

const app = express();

app.set("port", PORT);
app.set("env", NODE_ENV);

app.use(compression());
app.use(helmet());

const morgan = require("morgan");
const { morganFormat } = require("../common/utils");

app.use(morgan(morganFormat));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", express.static(STATIC_PATH));

app.use("/", router);
app.use(notFound);

app.use(databaseError);
app.use(handlerError);

module.exports = app;
