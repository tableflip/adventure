import { Input } from '../components'

export default class ValidateInput extends Input {
  state = {
    valid: true
  }

  onChange = () => {
    console.log('OMG extended a class', this.state.valid)
  }

  render () {
    return (
      <Input onChange={this.onChange} {...this.props} />
    )
  }
}
