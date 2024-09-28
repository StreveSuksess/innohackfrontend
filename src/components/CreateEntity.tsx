import Modal from './Modal'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { PropsWithChildren } from 'react'

interface CreateEntityProps {
	title: string
	description: string
	className?: string
}

const CreateEntity = ({
	title,
	description,
	className,
	children,
}: PropsWithChildren<CreateEntityProps>) => {
	return (
		<Modal title={title} description={description} className={className}>
			<Label htmlFor={title} className='sr-only'>
				{title} name
			</Label>

			<Input id={title} placeholder={`${title} name`} />

			{children}
		</Modal>
	)
}

export default CreateEntity
