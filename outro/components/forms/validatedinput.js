import PropTypes from 'prop-types'
import { Component } from 'react'
import Input from './input'

export default class ValidatedInput extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    minValidationLength: PropTypes.number
  }

  state = {
    error: null
  }

  onChange = (e) => {
    const { minValidationLength = 1 } = this.props
    if (e.target.value.length <= minValidationLength) return this.props.onChange(e)

    this.props.schema.validate(e.target.value, (error, value) => {
      this.setState({ error })
      this.props.onChange(e)
      e.target.focus()
    })
  }

  onBlur = (e) => {
    this.props.schema.validate(e.target.value, (error, value) => {
      if (error) this.setState({ error })
    })
  }

  onFocus = (e) => {
    this.setState({ error: null })
  }

  render () {
    const { onBlur, onChange, onFocus } = this
    const { error } = this.state
    const className = error ? 'b--dark-red' : ''
    const extendedProps = Object.assign({}, this.props, { onBlur, onChange, onFocus, className })
    return (
      <div className='w-100'>
        <Input {...extendedProps} />
        {error && <div className='pb3 dark-red f6'>{error.message}</div>}
      </div>
    )
  }
}
