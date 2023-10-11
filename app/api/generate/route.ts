import Replicate from 'replicate'
import { redis } from '@/app/utils/redis'
import { ratelimit } from '@/app/utils/redis'

const identifier = 'gif-api'

export const maxDuration = 60

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

  redis.incr('ai_gif_ct')

  return Response.json({ status: 'success', message: output })
}
