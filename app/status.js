var pjson = require('../package.json');



function get(req, res) {

	if (process.env.REDIS_HOST) {
		var Redis = require('ioredis');
	
		var client = Redis.createClient(
			process.env.REDIS_PORT, {
				'password': process.env.REDIS_PASSWORD,
				'host': process.env.REDIS_HOST,
				'port': process.env.REDIS_PORT,
				'tls': true
			});
		client.ping(function (err, result) {
			res.send({
				'api': 'ok',
				'version': pjson.version,
				// 'env': process.env,
				'redis': result || err
			});
		});
	} else {
		res.send({
			'api': 'ok',
			'version': pjson.version,
			'env': process.env
		});
	}

}

module.exports = get;
