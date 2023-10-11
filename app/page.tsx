import Main from '@/app/components/Main'
import Github from '@/app/components/Github'
import Twitter from '@/app/components/Twitter'

export default function IndexPage() {
  return (
    <main className='bg-white text-slate-900 h-full w-full min-h-screen py-12 lg:px-6 relative max-w-6xl mx-auto'>
      <div className='absolute top-0 right-0 mt-4 mr-4 flex items-center'>
        <Github className='hover:text-blue-600' />
        <Twitter className='ml-3 hover:text-blue-600' />
      </div>
      <h1 className='text-4xl sm:text-5xl font-extrabold text-center text-blue-950'>
        AI GIFs
      </h1>
      <p className='text-slate-500 text-center mt-2 text-xl sm:text-2xl'>
        Generate GIFs using AI
      </p>
      <Main />
    </main>
  )
}
