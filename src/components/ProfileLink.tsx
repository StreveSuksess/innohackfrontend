import AvatarChanger from './AvatarChanger'
import PasswordChanger from './PasswordChanger'
import Settings from './Settings'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Cookies from 'js-cookie'

const ProfileLink = () => {
	const logout = () => {
		Cookies.remove('Authorization')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='w-full outline-none'>
				<div className='px-3 py-2'>
					<div className='flex justify-start items-start'>
						<Avatar className='mr-3 rounded-full'>
							<AvatarImage
								src='https://via.placeholder.com/40'
								alt='User'
								className='rounded-full'
							/>

							<AvatarFallback>U</AvatarFallback>
						</Avatar>

						<div className='flex flex-col items-start justify-start'>
							<p className='text-sm font-medium'>User Name</p>
							<p className='text-xs text-gray-400'>user@example.com</p>
						</div>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-[180px] bg-zinc-900'>
				<AvatarChanger />
				<PasswordChanger />
				<Settings />
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logout} className='cursor-pointer'>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ProfileLink
