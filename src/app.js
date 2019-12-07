const express =  require('express');
const app = express();
const moongoose = require('mongoose');
const bodyParser = require('body-parser')
const config = require('./config')
const auth = require('./services/auth-services')
// Conectando ao banco de dados
moongoose.connect(config.connectionString,{ useUnifiedTopology: true, useNewUrlParser: true })
// Carregando Models
const custumerModel = require('./models/SchemaCustomer')
const produtoModel = require('./models/SchemaProduto')
const orderModel = require('./models/Schemaorder')
//carregando rotas
const index = require('./routes/index');
const produtos = require('./routes/produtos')
const customer = require('./routes/customer')
const order = require('./routes/order')
app.use(bodyParser.json({
    limit:'5mb'
}))
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',index);
app.use('/produtos',produtos);
app.use('/customers',customer);
app.use('/orders',order);

module.exports = app;


