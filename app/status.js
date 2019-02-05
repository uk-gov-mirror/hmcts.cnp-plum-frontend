const { version } = require("../package.json");
const redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const get = (req, res) => {
  if (REDIS_HOST !== undefined) {
    const client = redis.createClient(REDIS_PORT, {
      password: REDIS_PASSWORD,
      host: REDIS_HOST,
      port: REDIS_PORT,
      tls: true
    });
    client.ping((err, result) =>
      res.send({
        api: "ok",
        version,
        redis: result || err
      })
    );
  } else {
    res.send({
      api: "ok",
      version,
      env: process.env
    });
  }
};

module.exports = get;
