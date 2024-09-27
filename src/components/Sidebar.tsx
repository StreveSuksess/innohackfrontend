import {
	Squares2X2Icon,
	Cog6ToothIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
} from '@heroicons/react/24/outline'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useState } from 'react'

const desks = [
	{ name: 'Desk 1', href: '#' },
	{ name: 'Desk 2', href: '#' },
	{ name: 'Desk 3', href: '#' },
]

const projects = [
	{ name: 'Project A', href: '#' },
	{ name: 'Project B', href: '#' },
	{ name: 'Project C', href: '#' },
]

function Sidebar() {
	const [showProjects, setShowProjects] = useState(false)

	const toggleView = () => {
		setShowProjects(!showProjects)
	}

	return (
		<div className='relative flex flex-col h-screen w-64 bg-gray-900 text-white'>
			<div className='flex items-center justify-between px-6 py-6'>
				<h1 className='text-2xl font-bold'>
					{showProjects ? 'My Project' : 'Projects'}
				</h1>
				<button
					onClick={toggleView}
					className='p-1 rounded-md hover:bg-gray-800 transition-colors duration-200'
				>
					{showProjects ? (
						<ChevronLeftIcon className='w-6 h-6' />
					) : (
						<ChevronRightIcon className='w-6 h-6' />
					)}
				</button>
			</div>

			<div className='relative flex-1 overflow-hidden'>
				<div
					className={`absolute inset-0 transform transition-transform duration-300 ${
						showProjects ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<ScrollArea className='flex-1 px-4'>
						<nav className='space-y-2'>
							{desks.map(desk => (
								<a
									key={desk.name}
									href={desk.href}
									className='flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200'
								>
									<Squares2X2Icon className='w-5 h-5 mr-3' />
									{desk.name}
								</a>
							))}
						</nav>
					</ScrollArea>
				</div>

				<div
					className={`absolute inset-0 transform transition-transform duration-300 ${
						showProjects ? '-translate-x-full' : 'translate-x-0'
					}`}
				>
					<ScrollArea className='flex-1 px-4'>
						<nav className='space-y-2'>
							{projects.map(project => (
								<a
									key={project.name}
									href={project.href}
									className='flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200'
								>
									<Squares2X2Icon className='w-5 h-5 mr-3' />
									{project.name}
								</a>
							))}
						</nav>
					</ScrollArea>
				</div>
			</div>

			<div className='px-6 py-4'>
				<button className='flex items-center w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200'>
					<Cog6ToothIcon className='w-5 h-5 mr-3' />
					Settings
				</button>
			</div>

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
