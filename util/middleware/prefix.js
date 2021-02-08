const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prefix = new Schema({
  idguild: { type: "string" },
  prefix: { type: "string" },
});

module.exports = mongoose.model("Prefix", prefix);
