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
    'camenduru/animatediff-lightning-4-step:be39c6d599942831314b770f03cfd062bfd0faa8cc52e9289bcce830b721fcb6',
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
