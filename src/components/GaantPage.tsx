import '../Gaant.css'
import GanttChart from './GaantChart'
import React, { useState } from 'react'

interface Task {
	task: string
	description: string
	start: Date
	end: Date
	status: number
}

const tasks = [
	{
		task: 'Task 1',
		description: 'Description 1',
		start: new Date(2024, 8, 1),
		end: new Date(2024, 8, 5),
		status: 1,
	},
	{
		task: 'Task 2',
		description: 'Description 2',
		start: new Date(2024, 8, 3),
		end: new Date(2024, 8, 10),
		status: 2,
	},
	{
		task: 'Task 3',
		description: 'Description 3',
		start: new Date(2024, 8, 7),
		end: new Date(2024, 8, 12),
		status: 3,
	},
	{
		task: 'Task 4',
		description: 'Description 4',
		start: new Date(2024, 8, 7),
		end: new Date(2024, 8, 12),
		status: 4,
	},
	{
		task: 'Task 5',
		description: 'Description 5',
		start: new Date(2024, 8, 7),
		end: new Date(2024, 8, 12),
		status: 1,
	},
	{
		task: 'Task 6',
		description: 'Description 6',
		start: new Date(2024, 8, 7),
		end: new Date(2024, 8, 12),
		status: 2,
	},
	{
		task: 'Task 7',
		description: 'Description 7',
		start: new Date(2024, 8, 7),
		end: new Date(2024, 8, 12),
		status: 3,
	},
	{
		task: 'Task 8',
		description: 'Description 7',
		start: new Date(2024, 8, 7),
		end: new Date(2024, 8, 12),
		status: 3,
	},
	{
		task: 'Task 9',
		description: 'Description 7',
		start: new Date(2024, 8, 7),
		end: new Date(2024, 8, 12),
		status: 3,
	},
	{
		task: 'Task 10',
		description: 'Description 7',
		start: new Date(2024, 8, 7),
		end: new Date(2024, 8, 12),
		status: 3,
	},
]

const getStatusString = (status: number) => {
	switch (status) {
		case 1:
			return 'Not started'
		case 2:
			return 'In process'
		case 3:
			return 'Completed'
		case 4:
			return 'Failed'
		default:
			return 'Unknown'
	}
}

const GaantPage: React.FC = () => {
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)
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
							<td>{task.task}</td>
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
						<h1 className={'sidebar__title'}>Детали таска</h1>
						<p>
							<strong>Название:</strong> {selectedTask.task}
						</p>
						<p>
							<strong>Описание:</strong> {selectedTask.description}
						</p>
						<p>
							<strong>Начало:</strong> {selectedTask.start.toLocaleString()}
						</p>
						<p>
							<strong>Конец:</strong> {selectedTask.end.toLocaleString()}
						</p>
						<p>
							<strong>Статус:</strong> {getStatusString(selectedTask.status)}
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
