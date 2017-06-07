export default (props) => (
  <svg width={props.width || '14'} height={props.height || '14'} viewBox='0 0 24 24' transform='translate(0, 2.5)'>
    <path d='M20.485 20.485c-4.686 4.687-12.284 4.687-16.97 0-4.687-4.686-4.687-12.284 0-16.97 4.686-4.687 12.284-4.687 16.97 0 4.687 4.686 4.687 12.284 0 16.97zm-9.177-.685h1.95v-6.825h6.825v-1.95h-6.825V4.2h-1.95v6.825H4.483v1.95h6.825V19.8z' fill={props.fill || 'rgba(0,0,0,.4)'} fill-rule='evenodd' />
  </svg>
)
