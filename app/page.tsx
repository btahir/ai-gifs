'use client'
import { useState } from 'react'

// @ts-ignore
import promptmaker from 'promptmaker'
// @ts-ignore
import Filter from 'bad-words'

const filter = new Filter()

export default function IndexPage() {
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const prompt = formData.get('prompt')

    if (filter.isProfane(prompt)) {
      setLoading(false)
      alert("Please don't use profanity")
      return
    }

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    })
    const data = await res.json()

    if (data.status === 429) {
      setLoading(false)
      alert('You have hit the limit. Please try again in 3 hours.')
      return
    } else {
      setResultUrl(data.message)
      setLoading(false)
    }
  }

  return (
    <main className='bg-white text-slate-900 h-full w-full min-h-screen py-12 lg:px-6'>
      <h1 className='text-4xl sm:text-5xl font-extrabold text-center text-blue-950'>
        AI GIFs
      </h1>
      <p className='text-slate-500 text-center mt-2 text-xl sm:text-2xl'>
        Generate GIFs using AI
      </p>
      <div className='w-full h-full flex justify-center flex-col items-center mt-12 px-4'>
        <form
          onSubmit={handleSubmit}
          className='flex items-center w-full justify-center'
        >
          <input
            id='prompt'
            name='prompt'
            defaultValue={promptmaker()}
            placeholder='Enter gif prompt...'
            className='w-full max-w-sm flex-1 p-2 rounded-l-lg bg-slate-100 border-none text-slate-600 placeholder-slate-400 border border-slate-200'
          />
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 hover:text-white flex-shrink-0 text-base text-slate-50 py-2 px-4 rounded-r-lg border'
          >
            Hit it
          </button>
        </form>

        <div className='mt-12'>
          {loading ? (
            <div className='font-medium text-slate-600 sm:text-lg'>
              Loading your GIF. This can take 20-30 seconds.
              <img
                className='mt-4 w-full max-w-xs'
                src='https://media.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif'
              />
            </div>
          ) : resultUrl ? (
            <video
              className='w-full max-w-2xl rounded-sm'
              controls
              autoPlay
              muted
              loop
              src={resultUrl}
            />
          ) : null}
        </div>
      </div>
    </main>
  )
}
