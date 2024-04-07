const nodemailer = require("nodemailer");
const sql = require("mssql");
const { uuid } = require("./utils");
const { GetConnection } = require("./DatabaseController");
require("dotenv").config();

module.exports.SendMessage = function SendMessage(ip, emailFrom, subject, givenName, message) {
  return new Promise(async (resolve) => {
    //record the incoming message
    await RecordEmail(ip, emailFrom, subject, givenName, message);
    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILTO,
        pass: process.env.GMAIL_APP_PASSWORD, // Use your Gmail app password here
      },
    });

    // Email content
    const mailOptions = {
      from: emailFrom,
      to: process.env.MAILTO,
      subject: subject,
      text: "Reply Email: " + emailFrom + "\n" + "Given Name: " + (givenName ?? "Unknown") + "\n\n\n" + message,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return resolve({ success: false, error });
      } else {
        return resolve({ success: true });
      }
    });
  });
};

/**
 * Inserts a record into the Messages table to record all incoming email messages
 * @param {string} ip - The specified ip address
 * @param {string} email - The specified email address
 * @param {string} subject - The subject of the email
 * @param {string} message - The message sent
 * @param {string} givenName - The specified givenName
 * @returns {Promise} A promise that resolves with the result of the database operation
 */
function RecordEmail(ip, email, subject, message, givenName = null) {
  return new Promise(async (resolve) => {
    try {
      let connection = await GetConnection();
      if (!connection) return resolve({ success: false, error: "not connected to the database" });
      let query = `insert into Messages (id, ip, email, subject, message, givenName, timestamp) values(@id,@ip,@email,@subject,@message,@givenName,@timestamp)`;

      const request = connection.request();
      request.input("id", sql.VarChar(255), uuid());
      request.input("ip", sql.VarChar(255), ip);
      request.input("email", sql.VarChar(255), email);
      request.input("subject", sql.VarChar(255), subject);
      request.input("message", sql.VarChar(sql.MAX), message);
      request.input("givenName", sql.VarChar(255), givenName ?? "Unkown");
      request.input("timestamp", sql.DateTime, new Date().toISOString());

      request
        .query(query)
        .then((result) => {
          return resolve({ success: true, inserted: result.rowsAffected[0] });
        })
        .catch((error) => {
          return resolve({ success: false, error: error.message });
        });
    } catch (error) {
      return resolve({ success: false, error: error.toString() });
    }
  });
}
