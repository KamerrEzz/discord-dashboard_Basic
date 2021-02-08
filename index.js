const app = require("./server/express");
const mongoose = require('mongoose');
require("./server/bot");

app.listen(app.get("port"), () => {
  console.log("Pagina prendido");
});

let URI = `mongodb+srv://`;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Coneccion a la DB uniciado");
})