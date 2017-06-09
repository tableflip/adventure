export default (props) => (
  <svg width={props.width || '14'} height={props.height || '14'} viewBox='0 0 24 24' transform={`translate(${props.translate || '0, 0'})`}>
    {props.children}
  </svg>
)
