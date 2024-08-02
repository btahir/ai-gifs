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
      alert('You have hit the limit. Please try again in 24 hours.')
      return
    } else {
      setResultUrl(data.message)
      setLoading(false)
      setBtnDisabled(false)
    }
  }

  return (
    <div className='mt-12 flex h-full w-full flex-col items-center justify-center px-4'>
      <form
        onSubmit={handleSubmit}
        className='flex w-full flex-col items-center justify-center'
      >
        <textarea
          id='prompt'
          name='prompt'
          rows={3}
          defaultValue={promptmaker()}
          placeholder='Enter gif prompt...'
          className='w-full max-w-sm resize-none rounded-lg border border-none border-slate-200 bg-slate-100 p-2 text-slate-600 placeholder-slate-400'
        />
        <button
          type='submit'
          className={`${
            btnDisabled
              ? 'pointer-events-none cursor-not-allowed opacity-50'
              : ''
          } hover:text-white} mt-2 w-full max-w-sm rounded-lg border bg-blue-600 px-4 py-2 text-base text-slate-50 hover:bg-blue-700`}
        >
          Generate
        </button>
      </form>

      <div className='my-12'>
        {loading ? (
          <div className='font-medium text-slate-600 sm:text-lg'>
            Loading your GIF. This can take 20-30 seconds.
            <img className='mt-4 w-full max-w-xs' src='/loading.gif' />
          </div>
        ) : resultUrl ? (
          <video
            autoPlay
            loop
            className='h-96 w-full max-w-2xl rounded-lg'
            src={resultUrl}
          />
        ) : null}
      </div>
    </div>
  )
}
