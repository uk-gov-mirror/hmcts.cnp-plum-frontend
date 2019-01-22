var rp = require('request-promise');
const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('index.js');

function get(req, res) {
  logger.info({message: 'Yay, logging!'});

  var options = {
      uri: process.env.RECIPE_BACKEND_URL + '/recipes',
      json: true
    };
    rp(options).then(function(result) {
      res.render('index', { recipes: result.recipes});
    }).catch(function(err) {
      logger.error(err.stack);
      res.status(500).render('error', { message: 'Problem communicating with backend'});
    });
}

module.exports = get;
