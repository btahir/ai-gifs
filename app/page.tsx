export default function IndexPage() {
  return (
    <main className='bg-white text-slate-900 h-full w-full min-h-screen py-12 px-2 lg:px-6'>
      <h1 className='text-4xl sm:text-55xl font-bold text-center text-blue-950'>
        AI GIFs
      </h1>
      <p className='text-slate-500 text-center mt-2 text-xl sm:text-2xl'>
        Generate GIFs using AI
      </p>
      <div className='w-full h-full flex justify-center flex-col items-center mt-12 px-4'>
        <input
          placeholder='Enter gif prompt...'
          className='w-full max-w-sm p-2 rounded-sm bg-slate-100 border border-slate-200 text-slate-600 placeholder-slate-400'
        />
      </div>
    </main>
  )
}
