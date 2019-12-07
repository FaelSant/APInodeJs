'use strict'
const app = require('../src/app');
const http = require('http')
const debug =  require('debug')('nodestr:server')
const express = require('express');
const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);
const server = http.createServer(app)
const router = express.Router();
function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
    ? 'pipe' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
};

function normalizePort(val){
    const port = parseInt(val,10)

    if(isNaN(port)){
        return val
    }
    if(port >= 10){
        return port
    }
    return false;
}

server.listen(port)
server.on('Listening' , onListening)
console.log('API rodando na porta: ', port)




