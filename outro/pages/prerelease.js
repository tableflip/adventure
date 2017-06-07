import { Head } from '../components'
import PreReleaseForm from '../partials/pre-release-form'

export default () => (
  <div>
    <Head title='Pre release adventure' />
    <div className='measure-wide center pt4'>
      <div className='f1 lh-title pv4'>Pre release</div>
      <PreReleaseForm />
    </div>
  </div>
)
