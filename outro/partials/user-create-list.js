import { Component } from 'react'
import PropTypes from 'prop-types'
import { IconRemove, IconPlus, Input } from '../components'

export default class UserCreateList extends Component {
  static propTypes = {
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
  }
  render () {
    const { add, remove, list } = this.props
    return (
      <div>
        {list.length > 0 && list.map((item) => {
          return (
            <div className='flex items-center justify-start'>
              <div className='flex-auto'>{item}</div>
              <div className='flex-none ml2' onClick={() => remove(item)}><IconRemove /></div>
            </div>
          )
        })}
        <AddItem onAdd={add} />
      </div>
    )
  }
}

export class AddItem extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired
  }
  state = { value: '' }
  onChange = (e) => {
    const { value } = e.target
    this.setState({ value })
  }
  onClick = () => {
    const { value } = this.state
    if (value === '') return console.error('no value!')
    this.props.onAdd(this.state.value)
    this.setState({ value: '' })
  }
  render () {
    return (
      <div className='flex justify-end items-center w-100'>
        <Input className='flex-auto' name='item' onChange={this.onChange} value={this.state.value} />
        <div className='flex-none pointer mb2' onClick={this.onClick}>
          <span className='black-40 semibold mh2'>add item</span><IconPlus />
        </div>
      </div>
    )
  }
}
