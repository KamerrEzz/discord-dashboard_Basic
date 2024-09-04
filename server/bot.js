const { Client, IntentsBitField } = require("discord.js");
const client = new Client({
  intents: IntentsBitField.Flags.Guilds,
});

const {token} = require('../config/config')

client.on("ready", () => {
  console.log("Bot Prendido en la web");
});

client.login(token);

module.exports = client;
