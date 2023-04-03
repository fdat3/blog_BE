/**
 * @file redis config
 * @description redis config
 * @module config/redis.config
 * @see src/config/redis.config.ts
 */

import Variable from '@/env/variable.env'
import Redis from 'ioredis'

export const redis = new Redis({
  port: Variable.REDIS_PORT,
  host: Variable.REDIS_HOST,
  password: Variable.REDIS_PASSWORD,
  db: 0,
})
