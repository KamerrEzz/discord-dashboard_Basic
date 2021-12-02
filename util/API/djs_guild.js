const { discord_api, token } = require("../../config/config");
const fetch = require("got");

const opts = {
  method: "GET",
  headers: {
    Authorization: `Bot ${token}`,
  },
};

const djs_guilds = async () => {};
const djs_guild = async (guild_id) => {
    try {
        const res = await fetch(`${discord_api}/guilds/${guild_id}`, opts);
        const body = await res.body;
        return JSON.parse(body);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    djs_guilds,
    djs_guild
}