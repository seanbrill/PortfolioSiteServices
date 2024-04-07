const { GetConnection } = require("../DatabaseController");
const { GetGeoLocationIP } = require("../RadarController");

module.exports = async function (context, req) {
  try {
    let connection = await GetConnection();

    context.res = {
      status: 200,
      body: JSON.stringify({ status: "ok", connected: connection ? true : false, request: req }),
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error,
    };
  }
};
