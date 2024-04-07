const { LogEvent } = require("../LogEvent");

module.exports = async function (context, req) {
  try {
    LogEvent(req);
    context.res = {
      status: 200,
      body: "ok",
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: JSON.stringify(error.toString()),
    };
  }
};
