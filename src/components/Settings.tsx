import Modal from './Modal'
import { Input } from './ui/input'
import { Label } from './ui/label'

const Settings = () => {
	return (
		<Modal title='Settings' description='Change your account information'>
			<div>
				<Label htmlFor='firstname' className='sr-only'>
					Firstname
				</Label>

				<Input id='firstname' placeholder='Firstname' />
			</div>

			<div>
				<Label htmlFor='lastname' className='sr-only'>
					Lastname
				</Label>

				<Input id='lastname' placeholder='Lastname' />
			</div>
		</Modal>
	)
}

export default Settings
