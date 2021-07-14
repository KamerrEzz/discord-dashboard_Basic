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


  res.render("form", {
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

router.post("/dash/:id/prefix", (req, res) => {
  let id = req.params.id;
  let {prefix_form} = req.body;

  console.log(prefix_form);


  const saveGuldConfig = new GuildConfigModel({
    prefix: prefix_form
  })

  saveGuldConfig.save((err, db) => {
    if(err) console.error(err)
    console.log(db);
  })


  res.redirect(`/dash/${id}`)
})

module.exports = router;
