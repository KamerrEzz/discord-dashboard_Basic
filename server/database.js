const mongoose = require('mongoose');

const { db: { 
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST, 
} } = require('../config/config')

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("Base de datos conectada");
}).catch(err => {
  console.log(err);
})