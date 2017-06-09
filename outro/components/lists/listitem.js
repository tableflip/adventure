export default ({children = null, className = ''}) => (
  <div className={`flex items-center justify-start bg-black-10 hover-bg-black-20 pa2 ${className}`}>
    {children}
  </div>
)
