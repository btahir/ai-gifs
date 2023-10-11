import Main from '@/app/components/Main'
import Github from '@/app/components/Github'
import Twitter from '@/app/components/Twitter'

export default function IndexPage() {
  return (
    <main className='relative mx-auto h-full min-h-screen w-full max-w-6xl bg-white py-12 text-slate-900 lg:px-6'>
      <img
        src='/logo.png'
        alt='AI GIFs'
        className='absolute left-0 top-0 ml-4 mt-4 h-6 sm:h-8'
      />
      <div className='absolute right-0 top-0 mr-4 mt-4 flex items-center'>
        <Github className='h-6 w-6 hover:text-blue-600' />
        <Twitter className='ml-3 h-6 w-6 hover:text-blue-600' />
      </div>
      <h1 className='text-center text-4xl font-extrabold text-blue-950 sm:text-5xl'>
        AI GIFs
      </h1>
      <p className='mt-2 text-center text-xl text-slate-500 sm:text-2xl'>
        Generate GIFs using AI
      </p>
      <Main />
    </main>
  )
}
