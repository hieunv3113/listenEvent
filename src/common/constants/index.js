const path = require("path");

module.exports.STATUS = require("http").STATUS_CODES;

module.exports.PORT = parseInt(process.env.PORT || "6868");

module.exports.STATIC_PATH = path.join(
  process.cwd(),
  process.env.STATIC_FOLDER || "public"
);

module.exports.LOGS_PATH = path.join(process.cwd(), "logs");

module.exports.CACHE_TIME = 86400000 * 7; // 7 day
