import { Component } from 'react'
import Joi from 'joi-browser'
import { Input, Button, Textarea } from '../components'
import UserCreateList from './user-create-list'
import { preReleaseFormSchema } from '../schemas'

const InputList = ({ name, label, tips, onRemove, onAdd, onPaste, list }) => (
  <div>
    <label htmlFor={name} className='f6 b db mb2'>{label}{tips && <span className='fw3 ml1'>({tips})</span>}</label>
    <UserCreateList remove={onRemove.bind(null, name)} add={onAdd.bind(null, name)} list={list} paste={onPaste.bind(null, name)} />
  </div>
)

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
    if (index < 0) return console.error(`can't find ${item} in repos`)
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
    const isValid = Joi.validate(this.state.formData, preReleaseFormSchema)
    if (isValid.error) return console.error(isValid.error)
    console.log('OK SENDING', this.state.formData)
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
        <Input name='masterRepo' label='Name of master repository' required onChange={onChange} value={masterRepo} schema={preReleaseFormSchema.masterRepo} />
        <InputList name='repos' label='Other project repos' tips='optional' onAdd={onAdd} onRemove={onRemove} onPaste={onPaste} list={repos} />
        <InputList name='emails' label='Emails of testers' onAdd={onAdd} onRemove={onRemove} onPaste={onPaste} list={emails} />
        <Input name='deployment' label='Deployment URL' type='url' required onChange={onChange} value={deployment} />
        <Input name='workplan' label='Workplan URL' type='url' required onChange={onChange} value={workplan} />
        <Input name='version' label='Release number' type='number' required onChange={onChange} value={version} />
        <Textarea name='instructions' label='Instructions for testers' onChange={onChange} value={instructions} />
        <div className='pv2'>
          <Button value='Create Pre Release' onClick={onSubmit} />
        </div>
      </form>
    )
  }
}
