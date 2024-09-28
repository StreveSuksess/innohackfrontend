import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from '@/components/ui/user-auth-form'
import { toast } from '@/hooks/use-toast.ts'
import { cn } from '@/lib/utils'
import { useRegistrationMutation } from '@/services/authApi.ts'
import { Link, useNavigate } from 'react-router-dom'

export const SignUpPage = () => {
	const navigate = useNavigate()
	const [registration, { isLoading }] = useRegistrationMutation()
	const onSubmit = async (data: { email: string }) => {
		try {
			await registration(data.email)
			navigate('/login')
			toast({
				title: 'Check your email!',
				description: 'Find your password on your email',
			})
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			<div className='md:hidden'></div>
			<div className='container relative h-[100vh] flex-col items-center justify-center grid max-w-none lg:grid-cols-2 lg:px-0'>
				<Link
					to='/login'
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						'absolute right-4 top-4 md:right-8 md:top-8'
					)}
				>
					Login
				</Link>
				<div
					style={{
						background: 'url(/moon.avif) no-repeat',
						backgroundSize: 'cover',
					}}
					className='relative hidden h-full flex-col bg-muted p-10 text-white border-r lg:flex'
				/>
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
						<UserAuthForm onSubmit={onSubmit} isLoading={isLoading} />
					</div>
				</div>
			</div>
		</>
	)
}
