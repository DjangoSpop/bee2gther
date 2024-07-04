const redis = require('redis');
const util = require('util');

const client = redis.createClient(process.env.REDIS_URL);

client.hget = util.promisify(client.hget);

// Middleware to cache responses
module.exports = function cache(hashKey) {
  return async (req, res, next) => {
    const key = JSON.stringify(Object.assign({}, req.query, req.params));

    // Check if we have a value for 'key' in redis
    const cacheValue = await client.hget(hashKey, key);

    // If we do, return that
    if (cacheValue) {
      const doc = JSON.parse(cacheValue);
      return res.json(doc);
    }

    // Otherwise, continue with the request and set the response in redis
    res.originalJson = res.json;
    res.json = function(body) {
      client.hset(hashKey, key, JSON.stringify(body));
      res.originalJson(body);
    };
    next();
  };
};

// Clear hash
module.exports.clearHash = function(hashKey) {
  client.del(JSON.stringify(hashKey));
};
