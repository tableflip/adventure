import { Head, IconTableflip } from '../components'
import Link from 'next/link'

export default () => (
  <div>
    <Head title='TABLEFLIP adventure' />
    <div className='position absolute top-0 bottom-0 right-0 left-0 flex flex-column items-center justify-center'>
      <div className='mb3 black-40'>outro</div>
      <IconTableflip />
      <Link href='/prerelease'>
        <div className='pointer mt3 black-40'>pre-release</div>
      </Link>
      <Link href='/release'>
        <div className='pointer mt3 black-40'>release</div>
      </Link>
    </div>
  </div>
)
