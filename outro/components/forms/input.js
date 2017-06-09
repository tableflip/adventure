import PropTypes from 'prop-types'

const Input = (props) => (
  <div className='pv2 w-100'>
    {props.label && <label htmlFor={props.id || props.name} className='f6 b db mb2'>{props.label}</label>}
    <input
      id={props.id}
      name={props.name}
      className={`input-reset ba b--black-20 pa2 mb2 db w-100 outline-0 ${props.className || ''}`}
      type={props.type || 'text'}
      required={!!props.required}
      onChange={props.onChange}
      value={props.value}
      onPaste={props.onPaste}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      autoFocus={props.autoFocus}
      onKeyPress={props.onKeyPress} />
  </div>
)

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired || PropTypes.number.isRequired,
  onPaste: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyPress: PropTypes.func
}

export default Input
