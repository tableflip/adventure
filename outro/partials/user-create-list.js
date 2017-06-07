import { Component } from 'react'
import PropTypes from 'prop-types'
import { IconRemove, IconPlus, Input, ListItem } from '../components'

export default class UserCreateList extends Component {
  static propTypes = {
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    paste: PropTypes.func
  }
  render () {
    const { add, remove, list, paste } = this.props
    return (
      <div>
        {list.length > 0 && list.map((item, i) => {
          return (
            <ListItem className='mb2' key={item._id || `${item}-${i}`}>
              <div className='flex-auto'>{item}</div>
              <div className='flex-none ml2' onClick={() => remove(item)}><IconRemove translate='0, 2' /></div>
            </ListItem>
          )
        })}
        <AddItem onAdd={add} onPaste={paste} />
      </div>
    )
  }
}

export class AddItem extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onPaste: PropTypes.func
  }
  state = { value: '' }
  onChange = (e) => {
    const { value } = e.target
    this.setState({ value })
  }
  onPaste = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!this.props.onPaste) return
    const clipboardData = e.clipboardData || window.clipboardData
    this.props.onPaste(clipboardData.getData('Text'))
  }
  onClick = () => {
    const { value } = this.state
    if (value === '') return console.error('no value!')
    this.props.onAdd(this.state.value)
    this.setState({ value: '' })
  }
  onKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') this.onClick()
  }
  render () {
    return (
      <div className='flex justify-end items-center w-100 pr2'>
        <Input className='flex-auto' name='item' onChange={this.onChange} value={this.state.value} onPaste={this.onPaste} onKeyPress={this.onKeyPress} />
        <div className='flex-none pointer mb2' onClick={this.onClick}>
          <span className='black-40 f6 semibold mh2 mr2'>add item</span><IconPlus translate='0, 2' />
        </div>
      </div>
    )
  }
}
