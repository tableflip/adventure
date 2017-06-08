import { Component } from 'react'
import { Head } from '../components'
import PreReleaseForm from '../partials/pre-release-form'

export default class PreReleasePage extends Component {
  componentDidMount () {
    window.localStorage.removeItem('adventuredformdata')
  }
  onSubmit = ({ formData }) => {
    window.localStorage.setItem('adventuredformdata', JSON.stringify(formData))
    window.location = '/thanks'
  }
  render () {
    return (
      <div>
        <Head title='Pre release adventure' />
        <div className='measure-wide center pt4'>
          <div className='f1 lh-title pv4'>Pre release</div>
          <PreReleaseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    )
  }
}
