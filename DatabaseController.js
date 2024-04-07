const sql = require("mssql");
require("dotenv").config();
const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: true,
  },
};

/**
 * Initializes the sql connection, returns the connection if already established
 * @returns {SqlConnection} the connection object
 */
module.exports.GetConnection = function GetConnection() {
  return new Promise(async (resolve) => {
    sql
      .connect(config)
      .then((connection) => {
        return resolve(connection);
      })
      .catch((error) => {
        console.log("connection failed :" + error);
        return resolve(null);
      });
  });
};
