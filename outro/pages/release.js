import { Component } from 'react'
import { Head } from '../components'
import ReleaseForm from '../partials/release-form'

export default class ReleasePage extends Component {
  state = { formData: null }
  componentDidMount () {
    const formData = window.localStorage.getItem('adventuredformdata')
    if (formData) this.setState({ formData: JSON.parse(formData) })
  }
  onSubmit (formData) {
    console.log({formData})
    window.localStorage.removeItem('adventuredformdata')
    window.location = '/thanks'
  }
  render () {
    return (
      <div>
        <Head title='Pre release adventure' />
        <div className='measure-wide center pt4'>
          <div className='f1 lh-title pv4'>Release</div>
          <ReleaseForm formData={this.state.formData} onSubmit={this.onSubmit} />
        </div>
      </div>
    )
  }
}
