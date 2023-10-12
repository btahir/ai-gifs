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
    'lucataco/hotshot-xl:b57dddff6ae2029be57eab3d17e0de5f1c83b822f0defd8ce49bee44d7b52ee6',
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
