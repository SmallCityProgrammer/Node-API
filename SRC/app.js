const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology:true} )
.then(() => {
  console.log('Conectado a DB');
  console.log()
  app.emit('pronto');
}).catch(e => console.log(e))

const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;