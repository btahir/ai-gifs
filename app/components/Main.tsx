'use client'

import { useState } from 'react'

// @ts-ignore
import promptmaker from 'promptmaker'
// @ts-ignore
import Filter from 'bad-words'

const filter = new Filter()

type Props = {}

export default function Main({}: Props) {
  const [loading, setLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [resultUrl, setResultUrl] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setBtnDisabled(true)

    if (btnDisabled) return

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
      setBtnDisabled(false)
      alert('You have hit the limit. Please try again in 3 hours.')
      return
    } else {
      setResultUrl(data.message)
      setLoading(false)
      setBtnDisabled(false)
    }
  }

  return (
    <div className='w-full h-full flex justify-center flex-col items-center mt-12 px-4'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center w-full justify-center'
      >
        <textarea
          id='prompt'
          name='prompt'
          rows={2}
          defaultValue={promptmaker()}
          placeholder='Enter gif prompt...'
          className='w-full max-w-sm p-2 rounded-lg bg-slate-100 border-none text-slate-600 placeholder-slate-400 border border-slate-200 resize-none'
        />
        <button
          type='submit'
          className={`bg-blue-600 hover:bg-blue-700 hover:text-white text-base text-slate-50 py-2 px-4 mt-2 rounded-lg border w-full max-w-sm ${
            btnDisabled
              ? 'opacity-50 cursor-not-allowed pointer-events-none'
              : ''
          }}`}
        >
          Generate
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
  )
}
