const { STATUS } = require("../constants");

class Response {
  /**
   * Creates an API error.
   * @param {string} message - response message.
   * @param {string} data - data
   * @param {number} status - HTTP status code of response.
   * @param {number} total - total element
   * @param {number} page - current page
   * @param {number} pageSize - element per page
   * @param {number} totalPages - total pages
   */
  constructor({
    message,
    data,
    total,
    page,
    pageSize,
    totalPages,
    status = 200,
  }) {
    this.success = true;
    this.status = status;
    this.message = message || STATUS[status];
    this.total = total;
    this.page = page;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.data = data;
  }
}

module.exports = Response;
