import UserCreateList from './user-create-list'

export default ({ label, tips, onRemove, onAdd, field, array }) => (
  <div>
    <label htmlFor='email' className='f6 b db mb2'>Emails of testers</label>
    <UserCreateList remove={onRemove.bind(null, 'emails')} add={onAdd.bind(null, 'emails')} list={emails} />
  </div>
)
