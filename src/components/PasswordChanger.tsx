import Modal from './Modal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { DialogClose } from '@/components/ui/dialog.tsx'
import { useActions } from '@/hooks/useActions.ts'
import { useUpdateProfileMutation } from '@/services/userApi.ts'
import { useForm } from 'react-hook-form'

const PasswordChanger = () => {
	const { register, handleSubmit } = useForm()
	const [changePassword] = useUpdateProfileMutation()
	//@ts-ignore
	const { changePassword: changePasswordLocal } = useActions()
	//@ts-ignore

	const onSubmit = async (data: any) => {
		await changePassword(data)
		changePasswordLocal({
			newPassword: data.newPassword,
		})
	}

	return (
		<Modal title='Change password' description='Change your password'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-3'>
					<Label htmlFor='password' className='sr-only'>
						Current password
					</Label>

					<Input
						{...register('oldPassword')}
						id='password'
						placeholder='Password'
						type='password'
					/>
				</div>

				<div className='mb-3'>
					<Label htmlFor='new-password' className='sr-only'>
						New password
					</Label>

					<Input
						{...register('newPassword')}
						id='new-password'
						placeholder='New password'
						type='password'
					/>
				</div>

				<DialogClose>
					<Button type={'submit'} className='w-full'>
						Save
					</Button>
				</DialogClose>
			</form>
		</Modal>
	)
}

export default PasswordChanger
