export default () => (
  <form action='/' method='post'>
    <div className='pv2'>
      <label htmlFor='masterRepo' className='f6 b db mb2'>Name of master repository</label>
      <input id='masterRepo' name='masterRepo' className='input-reset ba b--black-20 pa2 mb2 db w-100' type='text' required />
    </div>
    <div className='pv2' id='repos'>
      <label htmlFor='repos' className='f6 b db mb2'>
        Other project repos (optional)
        <div className='normal black-60 ml1 dib'>
          <svg width='14px' height='14px' viewBox='0 0 24 24' transform='translate(0, 2.5)'>
            <path d='M20.485 20.485c-4.686 4.687-12.284 4.687-16.97 0-4.687-4.686-4.687-12.284 0-16.97 4.686-4.687 12.284-4.687 16.97 0 4.687 4.686 4.687 12.284 0 16.97zm-9.177-.685h1.95v-6.825h6.825v-1.95h-6.825V4.2h-1.95v6.825H4.483v1.95h6.825V19.8z' fill='rgba(0, 0, 0, .4)' fill-rule='evenodd' />
          </svg>
        </div>
      </label>
      <div id='repo' className='flex items-center'>
        <input name='repos' className='input-reset ba b--black-20 pa2 mb2 db flex-auto' type='text' />
      </div>
    </div>
    <div className='pv2' id='emails'>
      <label htmlFor='email' className='f6 b db mb2'>
        Emails of testers
        <div className='normal black-60 ml1 dib'>
          <svg width='14px' height='14px' viewBox='0 0 24 24' transform='translate(0, 2.5)'>
            <path d='M20.485 20.485c-4.686 4.687-12.284 4.687-16.97 0-4.687-4.686-4.687-12.284 0-16.97 4.686-4.687 12.284-4.687 16.97 0 4.687 4.686 4.687 12.284 0 16.97zm-9.177-.685h1.95v-6.825h6.825v-1.95h-6.825V4.2h-1.95v6.825H4.483v1.95h6.825V19.8z' fill='rgba(0, 0, 0, .4)' fill-rule='evenodd' />
          </svg>
        </div>
      </label>
      <div id='email' className='flex items-center'>
        <input name='emails' className='input-reset ba b--black-20 pa2 mb2 db flex-auto' type='email' required />
      </div>
    </div>
    <div className='pv2'>
      <label htmlFor='deployment' className='f6 b db mb2'>Deployment URL</label>
      <input id='deployment' name='deployment' className='input-reset ba b--black-20 pa2 mb2 db w-100' type='url' required />
    </div>
    <div className='pv2'>
      <label htmlFor='workplan' className='f6 b db mb2'>Workplan URL</label>
      <input id='workplan' name='workplan' className='input-reset ba b--black-20 pa2 mb2 db w-100' type='url' required onchange='onChange(this.value)' />
    </div>
    <div className='pv2'>
      <label htmlFor='version' className='f6 b db mb2'>Release number</label>
      <input id='version' name='version' className='input-reset ba b--black-20 pa2 mb2 db w-100' type='number' required />
    </div>
    <div className='pv2'>
      <label htmlFor='instructions' className='f6 b db mb2'>Instructions for testers</label>
      <textarea name='instructions' type='textarea' rows={5} className='pa1 w-100 b--black-20' style={{resize: 'none'}} defaultValue={''} />
    </div>
    <div className='pv2'>
      <input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6' type='submit' defaultValue='Create Pre-Release' />
    </div>
  </form>
)
