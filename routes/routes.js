const { Router } = require("express");
const passport = require("../server/passport");
const { auth } = require("../util/middleware/auth");
const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", passport.authenticate("discord"), (req, res) => {
  res.redirect("/dash");
});

router.use("/", require('./dash.routes'))

module.exports = router;
