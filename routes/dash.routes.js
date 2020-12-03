const { Router } = require("express");
const { auth } = require("../util/middleware/auth");
const router = Router();

router.get("/dash", auth, (req, res) => {
  res.json({
    user: req.user,
    bot: req.BotClient,
  });
});

router.get("/dash/:id", auth, (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let canales = servidor.channels.cache;

  res.render("dash", {
    user: req.user,
    servidor,
    canales,
  });
});

module.exports = router;
