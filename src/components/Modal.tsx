import { Button } from './ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { PropsWithChildren } from 'react'

interface Modal {
	title: string
	description: string
}

const Modal = ({ title, description, children }: PropsWithChildren<Modal>) => {
	return (
		<Dialog>
			<DialogTrigger className='w-full'>
				<button className='flex items-center w-full px-2 py-1.5 text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors duration-200'>
					{title}
				</button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>{children}</div>
				</div>

				<DialogFooter className='gap-2 sm:justify-between'>
					<DialogClose asChild>
						<Button type='button' variant='default'>
							Save
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default Modal
