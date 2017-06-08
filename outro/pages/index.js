import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default () => (
  <div>
    <Head title='TABLEFLIP adventure' />
    <div className='position absolute top-0 bottom-0 right-0 left-0 flex flex-column items-center justify-center'>
      <Link href='/prerelease'>
        <svg width='60' height='66' viewBox='0 0 99 109' className='pointer'>
          <g stroke='rgba(0, 0, 0, .4)' strokeLinecap='round' strokeLinejoin='round' fill='none' fillRule='evenodd'>
            <path d='M2 28.5L49.5 2 97 28v52.5l-46.5 27-48-26-.5-53z' strokeWidth='3' />
            <path d='M49 15.5L12.5 34 49 53l37.5-19L49 15.5zm-36.5 19v31m37-12v30m38-49v30' strokeWidth='5' />
          </g>
        </svg>
      </Link>
      <div className='mt3 black-40'>pre-release</div>
    </div>
  </div>
)
