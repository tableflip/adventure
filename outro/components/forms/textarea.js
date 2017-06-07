import PropTypes from 'prop-types'

const Textarea = (props) => (
  <div class='pv2'>
    {props.label && <label for={props.name} className='f6 b db mb2'>{props.label}</label>}
    <textarea name={props.name} type='textarea' rows='5' className='pa1 w-100 b--black-20' style={{resize: 'none'}} />
  </div>
)

Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default Textarea
