import Replicate from 'replicate'
import { Ratelimit } from '@upstash/ratelimit' // for deno: see above
import { Redis } from '@upstash/redis' // see below for cloudflare and fastly adapters

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(500, '1 d'),
  analytics: false,
  prefix: '@upstash/ratelimit',
})

const identifier = 'gif-api'

export async function POST(request: Request) {
  const { prompt } = await request.json()
  const { success } = await ratelimit.limit(identifier)

  if (!success) {
    return Response.json({ status: 429, message: 'Rate limit exceeded' })
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  })

  const output = await replicate.run(
    'lucataco/hotshot-xl:3897d2751458e9f0d4f969a9fd072627aadfa6a7e001875c3facb8e5e8f7182b',
    {
      input: {
        prompt,
        output: 'gif',
      },
    }
  )

  return Response.json({ status: 'success', message: output })
}
