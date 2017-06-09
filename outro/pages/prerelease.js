import { Component } from 'react'
import { Head } from '../components'
import PreReleaseForm from '../partials/pre-release-form'
import fetch from 'isomorphic-fetch'

export default class PreReleasePage extends Component {
  onSubmit = ({ formData }) => {
    fetch(`/?formdata=${btoa(JSON.stringify(formData))}`)
      .then((res) => window.location = '/thanks')
      .catch((err) => console.error(err))
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
