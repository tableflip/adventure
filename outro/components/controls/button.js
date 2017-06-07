export default (props) => (
  <input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6' type={props.type || 'button'} defaultValue={props.value || 'Do it'} />
)
