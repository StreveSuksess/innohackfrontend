import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import React from 'react'

type VersionType = {
	versionId: number
	name: string
	status: 'In process' | 'Completed' | 'Failed'
	timestamp: string
}

type TaskType = {
	id: number
	name: string
	status: 'In process' | 'Completed' | 'Failed'
	creator: string
	createdAt: string
	versions: VersionType[]
}

type HistoryProps = {
	tasks: TaskType[]
	selectedTask: TaskType | null
	setSelectedTaskId: React.Dispatch<React.SetStateAction<number | null>>
	rollbackTask: (taskId: number, version: VersionType) => void
}

export const History: React.FC<HistoryProps> = ({
	tasks,
	selectedTask,
	setSelectedTaskId,
	rollbackTask,
}) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Task History</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='mb-4'>
					<Select
						onValueChange={value => {
							setSelectedTaskId(Number(value))
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder='Select a task' />
						</SelectTrigger>
						<SelectContent>
							{tasks.map(task => (
								<SelectItem key={task.id} value={task.id.toString()}>
									{task.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{selectedTask ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Version ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Timestamp</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{selectedTask.versions
								.slice()
								.reverse()
								.map(version => (
									<TableRow key={version.versionId}>
										<TableCell>{version.versionId}</TableCell>
										<TableCell>{version.name}</TableCell>
										<TableCell>{version.status}</TableCell>
										<TableCell>{version.timestamp}</TableCell>
										<TableCell>
											<Button
												variant='outline'
												size='sm'
												onClick={() => rollbackTask(selectedTask.id, version)}
											>
												Rollback
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				) : (
					<p>Please select a task to view its history.</p>
				)}
			</CardContent>
		</Card>
	)
}
