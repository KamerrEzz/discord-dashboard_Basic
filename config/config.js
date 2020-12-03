require("dotenv").config();

module.exports = {
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  scope:["identify", "guilds"],
  token: process.env.token,
};
