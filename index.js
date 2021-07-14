const app = require("./server/express");
require("./server/bot");
require('./server/database');

app.listen(app.get("port"), () => {
  console.log("Pagina prendido");
});
