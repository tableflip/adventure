import { Component } from 'react'
import Joi from 'joi-browser'
import { Button, Textarea, ValidatedInput } from '../components'
import UserCreateList from './user-create-list'
import { preReleaseFormSchema } from '../schemas'

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

  onAdd = (field, item) => {
    const value = [...this.state.formData[field], item]
    this.updateField(field, value)
  }

  onRemove = (field, item) => {
    const items = [...this.state.formData[field]]
    const index = items.indexOf(item)
    if (index < 0) return console.error(`can not find ${item} in repos`)
    items.splice(index, 1)
    this.updateField(field, items)
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.updateField(name, value)
  }

  onPaste = (field, value) => {
    const items = value.trim().replace(/\s/g, '').split(/;|,/g)
    this.updateField(field, items)
  }

  onSubmit = () => {
    const { formData } = this.state
    Joi.validate(formData, Joi.object(preReleaseFormSchema), (error, value) => {
      if (error) return console.error(error)
      console.log({ formData })
    })
  }

  updateField = (field, value) => {
    const formData = Object.assign({}, this.state.formData, {[field]: value})
    this.setState({ formData })
  }

  render () {
    const { onChange, state, onAdd, onRemove, onPaste, onSubmit } = this
    const { masterRepo, repos, emails, deployment, workplan, version, instructions } = state.formData

    return (
      <form action='/' method='post'>
        <ValidatedInput
          name='masterRepo'
          label='Name of master repository'
          onChange={onChange}
          value={masterRepo}
          autoFocus
          schema={preReleaseFormSchema.masterRepo} />
        <div>
          <label htmlFor='repos' className='f6 b db mb2'>Other repos <span className='fw3 ml1'>(optional)</span></label>
          <UserCreateList
            remove={onRemove.bind(null, 'repos')}
            add={onAdd.bind(null, 'repos')}
            list={repos}
            paste={onPaste.bind(null, 'repos')} />
        </div>
        <div>
          <label htmlFor='emails' className='f6 b db mb2'>Testers emails</label>
          <UserCreateList
            remove={onRemove.bind(null, 'emails')}
            add={onAdd.bind(null, 'emails')}
            list={emails}
            paste={onPaste.bind(null, 'emails')}
            schema={Joi.string().email()} />
        </div>
        <ValidatedInput
          name='deployment'
          label='Deployment URL'
          onChange={onChange}
          value={deployment}
          schema={preReleaseFormSchema.deployment} />
        <ValidatedInput
          name='workplan'
          label='Workplan URL'
          onChange={onChange}
          value={workplan}
          schema={preReleaseFormSchema.workplan} />
        <ValidatedInput
          name='version'
          label='Version number'
          onChange={onChange}
          value={version}
          schema={preReleaseFormSchema.version}
          validateOnChange />
        <Textarea name='instructions' label='Instructions for testers' onChange={onChange} value={instructions} />
        <div className='pv2'>
          <Button value='Create Pre Release' onClick={onSubmit} />
        </div>
      </form>
    )
  }
}
