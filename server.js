
const appInsights = require('applicationinsights');
const express = require('express');
const path = require('path');
const { Express, Logger } = require('@hmcts/nodejs-logging');
const { APPINSIGHTS_INSTRUMENTATIONKEY } = process.env;

const status = require('./app/status');
const index = require('./app/index');

if (APPINSIGHTS_INSTRUMENTATIONKEY !== undefined) {
    appInsights
        .setup(APPINSIGHTS_INSTRUMENTATIONKEY)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setUseDiskRetryCaching(true)
        .start();

    const client = appInsights.defaultClient;
    const PERIOD = 30000; // 30 seconds

    setInterval(() => {
        client.trackEvent({ name: "ping", properties: { timestamp: Date.now().toString() } });
    }, PERIOD);
}

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(Express.accessLogger());
app.use('/health', status);
app.use('/', index);

const logger = Logger.getLogger('server.js');
const port = process.env.PORT || 1337;
const server = app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});

module.exports = {
    app,
    server
};
