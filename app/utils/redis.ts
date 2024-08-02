import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Create a new ratelimiter, that allows 1 / 24 hours
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(0, '24 h'),
  analytics: false,
  prefix: '@upstash/ratelimit',
})
