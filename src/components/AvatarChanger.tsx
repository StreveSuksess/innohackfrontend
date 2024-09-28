import Modal from './Modal'
import { Input } from './ui/input'
import { Label } from '@radix-ui/react-label'

const AvatarChanger = () => {
	return (
		<Modal title='Change avatar' description='Change your avatar'>
			<div>
				<Label htmlFor='avatar' className='sr-only'>
					Avatar
				</Label>

				<Input id='avatar' placeholder='Avatar' type='file' />
			</div>
		</Modal>
	)
}

export default AvatarChanger
