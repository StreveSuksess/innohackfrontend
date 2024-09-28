import { Button } from '@/components/ui/button.tsx'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
	login?: boolean
	onSubmit: (data: any) => void
	isLoading: boolean
}

export function UserAuthForm({
	className,
	login,
	onSubmit,
	isLoading,
	...props
}: UserAuthFormProps) {
	const { register, handleSubmit } = useForm()

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>

						<Input
							{...register('email')}
							id='email'
							placeholder='name@example.com'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
						/>

						{login && (
							<>
								<Label className='sr-only' htmlFor='password'>
									Password
								</Label>
								<Input
									{...register('password')}
									id='password'
									placeholder='password'
									type='password'
									autoCapitalize='none'
									autoComplete='email'
									autoCorrect='off'
									disabled={isLoading}
								/>
							</>
						)}
					</div>

					<Button variant={'default'} disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)}
						{login ? 'Login' : 'Sign up'}
					</Button>
				</div>
			</form>
		</div>
	)
}
