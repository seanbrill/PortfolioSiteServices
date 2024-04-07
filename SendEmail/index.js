const { SendMessage } = require("../EmailController");
const { LogEvent } = require("../LogEvent");

module.exports = async function (context, req) {
  try {
    let ip = (req.headers["x-forwarded-for"] || req.headers["x-client-ip"] || req.ip) ?? "?";
    let email = req.body.email;
    let subject = req.body.subject;
    let givenName = req.body.givenName;
    let message = req.body.message;
    if (!subject || !givenName || !email || !message) {
      throw new Error("missing details please fill in all fields");
    }

    //log the incomming email event
    //this will allow us to capture given names over time
    LogEvent(req, "email").then((res) => {
      //console.log("event logged");
    });

    let sendMessageResponse = await SendMessage(ip, email, subject, givenName, message);

    context.res = {
      body: JSON.stringify(sendMessageResponse),
    };
  } catch (error) {
    context.res = {
      status: 200,
      body: JSON.stringify({ success: false, error: error.toString() }),
    };
  }
};
