const { Client } = require("discord.js");
const client = new Client();

const {token} = require('../config/config')

client.on("ready", () => {
  console.log(`Bot ${client.user.tag} Prendido en la web`);
});

client.login(token);

module.exports = client;