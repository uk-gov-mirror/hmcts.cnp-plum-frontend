
const express = require('express');
const { Logger } = require('@hmcts/nodejs-logging');

var path = require('path');  

var status = require('./app/status');
var index = require('./app/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');


app.use('/health', status);
app.use('/', index);

Logger.config({
    microservice: 'recipe-service',
    team: 'rhubarb',
    environment: process.env.NODE_ENV
});

const logger = Logger.getLogger('server.js');

var port = process.env.PORT || 1337;

var server = app.listen(port, function () {
   logger.info('Listening on port ' +port );
});

module.exports = { 
    app: app, 
    server: server 
}; //for testing
