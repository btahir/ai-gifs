export default function Banner() {
  return (
    <div className='pointer-events-none fixed inset-x-0 bottom-0 mx-auto w-full max-w-xl  sm:px-6 sm:pb-5 lg:px-8'>
      <div className='pointer-events-auto flex items-center justify-between gap-x-6 bg-slate-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5'>
        <p className='text-sm leading-6 text-white'>
          <a
            href='https://www.you-tldr.com?utm_source=aigifs'
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong className='font-semibold'>YOU-TLDR</strong>
            <svg
              viewBox='0 0 2 2'
              className='mx-2 inline h-0.5 w-0.5 fill-current'
              aria-hidden='true'
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            Get the TLDR of any YouTube Video in seconds&nbsp;
            <span aria-hidden='true'>&rarr;</span>
          </a>
        </p>
      </div>
    </div>
  )
}
