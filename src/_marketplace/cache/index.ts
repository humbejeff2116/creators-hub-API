import { connectToCacheStore } from "./lib/index.js";
import redisInterface from "./lib/redis.js";
import RedisStore from 'connect-redis';

const sessionStorePrefix = "userSession:";
const sessionRedisStore = new RedisStore({
    client: redisInterface.getClient(),
    prefix: sessionStorePrefix,
});

export {
    connectToCacheStore,
    sessionRedisStore,
    sessionStorePrefix,
}