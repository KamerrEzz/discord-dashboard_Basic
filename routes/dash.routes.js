const { Router, json } = require("express");
const { auth } = require("../util/middleware/auth");

const GuildConfigModel = require('../util/models/guild')

const router = Router();

router.get("/dash", auth, (req, res) => {
  let servidores = [];
  let guilds = req.user.guilds.filter((p) => (p.permissions & 8) === 8);

  for (const key in guilds) {
    if (req.BotClient.guilds.cache.get(guilds[key].id)) {
      servidores.push({
        esta: true,
        id: req.BotClient.guilds.cache.get(guilds[key].id).id,
        name: req.BotClient.guilds.cache.get(guilds[key].id).name,
        icon: req.BotClient.guilds.cache.get(guilds[key].id).icon,
      });
    } else {
      servidores.push({
        esta: false,
        id: guilds[key].id,
        name: guilds[key].name,
        icon: guilds[key].icon,
      });
    }
  }

  res.render("dash", {
    user: req.user,
    servidores,
  });
});

router.get("/dash/:id", auth, async (req, res) => {

  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let channelServer = servidor.channels.cache.filter(ch => ch.type == "text").map(a => ({id: a.id, name: a.name}));
  let guild = await GuildConfigModel.findOne({ guildID: id });

  res.render("form", {
    guild: guild ? guild : false,
    channel: channelServer,
    servidor: servidor.name,
    servidorID: servidor.id
  })


  // let miembro = servidor.members.cache.get(req.user.id).roles.cache.map(rol => ({name:rol.name, id: rol.id}))

  // console.log(miembro)

  // let emoji = JSON.stringify(servidor.emojis.cache);
  // res.json({
  //   servidor,
  //   miembro,
  //   canales: servidor.channels.cache,
  //   roles: servidor.roles.cache,
  //   emojis: JSON.parse(emoji),
  // })
});

router.post("/dash/:id/prefix", async (req, res) => {
  let id = req.params.id;
  let { prefix_form } = req.body;

  if(prefix_form.length > 0) {
    let guild = await GuildConfigModel.findOne({ guildID: id });
    if (!guild) {
      const saveGuldConfig = new GuildConfigModel({
        guildID: id,
        prefix: prefix_form
      })
  
      saveGuldConfig.save((err, db) => {
        if (err) console.error(err)
        console.log("sabe", db);
      })
  
    } else {
      await GuildConfigModel.updateOne({ guildID: id }, { prefix: prefix_form });
    }
  } else {
    await GuildConfigModel.deleteOne({ guildID: id });
  }

  res.redirect(`/dash/${id}`)
})
router.post('/dash/:id/logs', async (req, res) => {
  let id = req.params.id;
  let channel = req.body.logs

  console.log(channel)
  res.redirect(`/dash/${id}`)
})
module.exports = router;
