const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const config =  require('../config')

const app = express();

mongoose.connect(config.connectionString, {useNewUrlParser: true, useUnifiedTopology:true} )
  .then(() => {
    console.log('Conectado a DB');
    console.log()
    app.emit('pronto');
  }).catch(e => console.log(e));

const Product = require('./Models/product')
const Customer = require("./Models/customer")
const Order = require('./Models/order')


const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')
const orderRoute = require('./routes/order-route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app;