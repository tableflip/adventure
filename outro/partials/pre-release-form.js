import { Component } from 'react'
import { Input, Button, Textarea, IconPlus } from '../components'
import UserCreateList from './user-create-list'

export default class PreReleaseForm extends Component {
  state = {
    formData: {
      masterRepo: '',
      repos: [],
      emails: [],
      deployment: '',
      workplan: '',
      version: '',
      instructions: ''
    }
  }

  onAddRepo = (item) => {
    const value = [...this.state.formData.repos, item]
    this.updateField('repos', value)
  }

  onRemoveRepo = (item) => {
    const repos = [...this.state.formData.repos]
    const index = repos.indexOf(item)
    if (index < 0) return console.error(`can't find ${item} in repos`)
    repos.splice(index, 1)
    this.updateField('repos', repos)
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.updateField(name, value)
  }

  updateField = (field, value) => {
    const formData = Object.assign({}, this.state.formData, {[field]: value})
    this.setState({ formData })
  }

  render () {
    const { onChange, state, onAddRepo, onRemoveRepo } = this
    const { masterRepo, repos, deployment, workplan, version, instructions } = state.formData
    return (
      <form action='/' method='post'>
        <Input name='masterRepo' label='Name of master repository' required onChange={onChange} value={masterRepo} />
        <div className='pv2' id='repos'>
          <label htmlFor='repos' className='f6 b db mb2'>Other project repos (optional)</label>
          <UserCreateList remove={onRemoveRepo} add={onAddRepo} list={repos} />
        </div>
        <div className='pv2' id='emails'>
          <label htmlFor='email' className='f6 b db mb2'>
            Emails of testers<div className='normal black-60 ml1 dib'><IconPlus /></div>
          </label>
          <div id='email' className='flex items-center'>
            <input name='emails' className='input-reset ba b--black-20 pa2 mb2 db flex-auto' type='email' required />
          </div>
        </div>
        <Input name='deployment' label='Deployment URL' type='url' required onChange={onChange} value={deployment} />
        <Input name='workplan' label='Workplan URL' type='url' required onChange={onChange} value={workplan} />
        <Input name='version' label='Release number' type='number' required onChange={onChange} value={version} />
        <Textarea name='instructions' label='Instructions for testers' onChange={onChange} value={instructions} />
        <div className='pv2'>
          <Button value='Create Pre Release' />
        </div>
      </form>
    )
  }
}
