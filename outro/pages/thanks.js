import { Head, IconTableflip } from '../components'
import Link from 'next/link'

export default () => (
  <div>
    <Head title='Thanks adventure' />
    <div className='position absolute top-0 bottom-0 right-0 left-0 flex flex-column items-center justify-center'>
      <div className='mb3 black-40'>Thanks</div>
      <IconTableflip />
      <Link href='#'>
        <div className='pointer mt3 black-40'>link to the deployment</div>
      </Link>
      <Link href='#'>
        <div className='pointer mt3 black-40'>link to the workplan</div>
      </Link>
      <Link href='/'>
        <div className='pointer mt3 black-40'>dashboard</div>
      </Link>
    </div>
  </div>
)
