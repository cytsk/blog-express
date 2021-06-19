const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// create client
const redisClinet = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClinet.on('error', err => {
    console.log(err)
})

module.exports = redisClinet