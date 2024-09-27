import { Button } from '@/components/ui/button.tsx'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { HTMLAttributes, SyntheticEvent, useState } from 'react'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
	login?: boolean
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(event: SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>

						<Input
							id='email'
							placeholder='name@example.com'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
						/>
						{props?.login && (
							<>
								<Label className='sr-only' htmlFor='password'>
									Password
								</Label>
								<Input
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
						Log In
					</Button>
				</div>
			</form>
		</div>
	)
}
