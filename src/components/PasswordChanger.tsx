import Modal from './Modal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

const PasswordChanger = () => {
	return (
		<Modal title='Change password' description='Change your password'>
			<div>
				<Label htmlFor='password' className='sr-only'>
					Current password
				</Label>

				<Input id='password' placeholder='Password' type='password' />
			</div>

			<div>
				<Label htmlFor='new-password' className='sr-only'>
					New password
				</Label>

				<Input id='new-password' placeholder='New password' type='password' />
			</div>

			<Button>Save</Button>
		</Modal>
	)
}

export default PasswordChanger
