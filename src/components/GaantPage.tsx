import '../Gaant.css'
import GanttChart from './GaantChart'
import { useAppSelector } from '@/hooks/useAppSelector'
import { ITask } from '@/types/projectTypes'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const getStatusString = (status: string) => {
	switch (status) {
		case 'NOT_STARTED':
			return 'Not started'
		case 'IN_PROGRESS':
			return 'In process'
		case 'COMPLETED':
			return 'Completed'
		case 'FAILED':
			return 'Failed'
		default:
			return 'Unknown'
	}
}

const GaantPage: React.FC = () => {
	const { projectId, deskId } = useParams()

	const tasks = useAppSelector(state => {
		const projectIndex = state.projects.projects.findIndex(
			project => project.id === projectId
		)
		const deskIndex = state.projects?.projects[projectIndex]?.desks.findIndex(
			desk => desk.id === deskId
		)

		return state.projects.projects[projectIndex]?.desks[deskIndex]?.tasks ?? []
	})

	const [selectedTask, setSelectedTask] = useState<ITask | null>(null)
	const taskHeight = 50
	const taskGap = 10
	const tableRowHeight = 50
	const [chartHeight, setChartHeight] = useState(
		tasks.length * (taskHeight + taskGap) - taskGap
	)
	const [tableHeight] = useState(tasks.length * tableRowHeight)

	return (
		<div className='gaant__container'>
			<table style={{ height: tableHeight }}>
				<thead>
					<tr>
						<th>Task Name</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task, index) => (
						<tr key={index} onClick={() => setSelectedTask(task)}>
							<td>{task.name}</td>
							<td>{getStatusString(task.status)}</td>
							<td>
								<button onClick={() => setSelectedTask(task)}>
									View Details
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div
				className={`details-panel ${selectedTask ? 'task-details' : 'none'}`}
				style={{ height: chartHeight }}
			>
				{selectedTask && (
					<>
						<h1 className={'sidebar__title'}>Details</h1>
						<p>
							<strong>Name:</strong> {selectedTask.name}
						</p>
						<p>
							<strong>Description:</strong> {selectedTask.description}
						</p>
						<p>
							<strong>Start:</strong> {selectedTask.start?.toLocaleString()}
						</p>
						<p>
							<strong>End:</strong> {selectedTask.end?.toLocaleString()}
						</p>
						<p>
							<strong>Status:</strong> {getStatusString(selectedTask.status)}
						</p>
						<button
							className='close-button'
							onClick={() => setSelectedTask(null)}
						>
							<i
								className='bi bi-x'
								style={{ color: 'black', fontSize: '2.5em' }}
							></i>
						</button>
					</>
				)}
			</div>
			<div className='chart-container'>
				<GanttChart
					tasks={tasks}
					setChartHeight={setChartHeight}
					setSelectedTask={setSelectedTask}
				/>
			</div>
		</div>
	)
}

export default GaantPage
