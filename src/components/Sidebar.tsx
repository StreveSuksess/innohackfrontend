import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ScrollArea } from './ui/scroll-area'
import { Squares2X2Icon } from '@heroicons/react/24/outline'

const desks = [
	{ name: 'Desk 1', href: '#' },
	{ name: 'Desk 2', href: '#' },
	{ name: 'Desk 3', href: '#' },
]

function Sidebar() {
	return (
		<div className='flex flex-col h-screen w-64 bg-gray-900 text-white'>
			<div className='px-6 py-6'>
				<h1 className='text-2xl font-bold'>My Project</h1>
			</div>

			<ScrollArea className='flex-1 px-4'>
				<nav className='space-y-2'>
					{desks.map(desk => (
						<a
							key={desk.name}
							href={desk.href}
							className='flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800'
						>
							<Squares2X2Icon className='w-5 h-5 mr-3' />
							{desk.name}
						</a>
					))}
				</nav>
			</ScrollArea>

			{/* Profile Section */}
			<div className='px-6 py-6'>
				<div className='flex items-center'>
					<Avatar className='mr-3'>
						<AvatarImage src='https://via.placeholder.com/40' alt='User' />
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<div>
						<p className='text-sm font-medium'>User Name</p>
						<p className='text-xs text-gray-400'>user@example.com</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
