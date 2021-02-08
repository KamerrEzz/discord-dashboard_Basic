const { Router, json } = require("express");
const { auth } = require("../util/middleware/auth");

const Prefix = require("../util/middleware/prefix")

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

  // let prefix = await Prefix.findOne({idguild: req.params.id})
  // console.log(prefix)

  // res.render("formulario", {
  //   id: req.params.id
  // })


  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let miembro = servidor.members.cache.get(req.user.id).roles.cache.map(rol => ({name:rol.name, id: rol.id}))

  console.log(miembro)

  let emoji = JSON.stringify(servidor.emojis.cache);
  res.json({
    servidor,
    miembro,
    canales: servidor.channels.cache,
    roles: servidor.roles.cache,
    emojis: JSON.parse(emoji),
  })

  // res.render("data", {
  //   user: req.user,
  //   servidor,
  //   canales: servidor.channels.cache.filter(ch => ch.type === "text").map(ch => ({name: ch.name, id: ch.id})),
  //   roles: servidor.roles.cache,
  //   emojis: JSON.parse(emoji),
  // });
});

router.post("/dash/:id/prefix", (req, res) => {
  let bodyprefix = req.body.prefix;
  let newprefix = new Prefix({
    idguild: req.params.id,
    prefix: bodyprefix,
  })

  newprefix.save((error, db) => {
    console.log(db)
  })

  res.redirect(`/dash/${req.params.id}`);
})

module.exports = router;
