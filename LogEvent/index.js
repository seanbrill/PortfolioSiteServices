const { LogEvent } = require("../LogEvent");

module.exports = async function (context, req) {
  LogEvent(req);
  context.res = {
    status: 200,
    body: "ok",
  };
};
