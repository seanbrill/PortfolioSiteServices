const XMLHttpRequest = require("xhr2");
const { tryparse } = require("./utils");
require("dotenv").config();
const api = "https://api.radar.io/v1/geocode/ip";

/**
 * Initializes the sql connection, returns the connection if already established
 * @returns {SqlConnection} the connection object
 */
module.exports.GetGeoLocationIP = function GetGeoLocationIP(ip) {
  return new Promise((resolve) => {
    try {
      let request = new XMLHttpRequest();
      request.open("GET", api + "?ip=" + ip);
      request.setRequestHeader("Authorization", process.env.RADAR_API_KEY);
      request.send();
      request.onload = () => {
        let response = tryparse(request.response);
        if (response) {
          return resolve({ success: true, response: response });
        } else {
          return resolve({ success: false, error: "error decoding json" + request.response });
        }
      };
    } catch (error) {
      return resolve({ success: false, error });
    }
  });
};
