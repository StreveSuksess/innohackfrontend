import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from '@/components/ui/user-auth-form'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export const SignUpPage = () => {
	return (
		<>
			<div className='container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<Link
					to='/login'
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						'absolute right-4 top-4 md:right-8 md:top-8'
					)}
				>
					Login
				</Link>
				<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
					<div className='absolute inset-0 bg-zinc-900' />
				</div>
				<div className='lg:p-8'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-semibold tracking-tight'>
								Create an account
							</h1>
							<p className='text-sm text-muted-foreground'>
								Enter your email below to create your account
							</p>
						</div>
						<UserAuthForm />
					</div>
				</div>
			</div>
		</>
	)
}
