import CreateEntity from '@/components/CreateEntity'
import { History } from '@/components/History'
import { Member } from '@/components/Member'
import { Task } from '@/components/Task'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Home,
	LineChart,
	ListFilter,
	Package,
	Package2,
	PanelLeft,
	Search,
	ShoppingCart,
	Users2,
} from 'lucide-react'
import React, { useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

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

type MemberType = {
	id: number
	name: string
	role: string
}

export const Tasks: React.FC = () => {
	const projectName = 'Project Name'
	const deskName = 'Desk Name'

	// State for tasks
	const [tasks, setTasks] = useState<TaskType[]>([
		{
			id: 1,
			name: 'Laser Lemonade Machine',
			status: 'In process',
			creator: 'JJJ',
			createdAt: '2023-07-12 10:42 AM',
			versions: [
				{
					versionId: 1,
					name: 'Laser Lemonade Machine',
					status: 'In process',
					timestamp: '2023-07-12 10:42 AM',
				},
			],
		},
		{
			id: 2,
			name: 'Task 2',
			status: 'Completed',
			creator: 'AAA',
			createdAt: '2023-07-13 11:00 AM',
			versions: [
				{
					versionId: 1,
					name: 'Task 2',
					status: 'Completed',
					timestamp: '2023-07-13 11:00 AM',
				},
			],
		},
	])

	const [searchTerm, setSearchTerm] = useState<string>('')

	const [selectedFilters, setSelectedFilters] = useState<{
		status: string[]
	}>({
		status: [],
	})

	const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

	const [members, setMembers] = useState<MemberType[]>([
		{ id: 1, name: 'John Doe', role: 'Developer' },
		{ id: 2, name: 'Jane Smith', role: 'Designer' },
	])

	const handleStatusFilterChange = (status: string, checked: boolean) => {
		setSelectedFilters(prevFilters => {
			const newStatusFilters = checked
				? [...prevFilters.status, status]
				: prevFilters.status.filter(s => s !== status)
			return {
				...prevFilters,
				status: newStatusFilters,
			}
		})
	}

	const updateTask = (updatedTask: TaskType) => {
		setTasks(prevTasks =>
			prevTasks.map(task => {
				if (task.id === updatedTask.id) {
					return {
						...updatedTask,
						versions: [
							...task.versions,
							{
								versionId: task.versions.length + 1,
								name: updatedTask.name,
								status: updatedTask.status,
								timestamp: new Date().toLocaleString(),
							},
						],
					}
				}
				return task
			})
		)
	}

	const deleteTask = (taskId: number) => {
		setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
	}

	const filteredTasks = tasks.filter(task => {
		const matchesSearchTerm = task.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
		const matchesStatusFilter =
			selectedFilters.status.length === 0 ||
			selectedFilters.status.includes(task.status)
		return matchesSearchTerm && matchesStatusFilter
	})

	const rollbackTask = (taskId: number, version: VersionType) => {
		setTasks(prevTasks =>
			prevTasks.map(task => {
				if (task.id === taskId) {
					return {
						...task,
						name: version.name,
						status: version.status,
						versions: [
							...task.versions,
							{
								versionId: task.versions.length + 1,
								name: task.name,
								status: task.status,
								timestamp: new Date().toLocaleString(),
							},
						],
					}
				}
				return task
			})
		)
	}

	const addMember = (member: MemberType) => {
		setMembers(prevMembers => [...prevMembers, member])
	}

	const removeMember = (memberId: number) => {
		setMembers(prevMembers =>
			prevMembers.filter(member => member.id !== memberId)
		)
	}

	const selectedTask = tasks.find(task => task.id === selectedTaskId) || null

	return (
		<div className='flex min-h-screen w-full'>
			<div className='flex flex-col sm:gap-4 sm:py-4 w-full'>
				<header className='top-0 z-30 flex items-center gap-4 static h-auto border-0 bg-transparent px-6'>
					<Breadcrumb className='md:flex'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to='#'>{projectName}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to='#'>{deskName}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<DropdownMenu>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
					<Tabs defaultValue='tasks'>
						<div className='flex items-center'>
							<TabsList>
								<TabsTrigger value='tasks'>Tasks</TabsTrigger>
								<TabsTrigger value='history'>History</TabsTrigger>
								<TabsTrigger value='members'>Project Members</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent value='tasks'>
							<Card x-chunk='dashboard-06-chunk-0'>
								<CardHeader className='flex flex-row items-center justify-between w-full'>
									<CardTitle>Tasks</CardTitle>

									<div className='ml-auto flex items-center gap-2'>
										<div className='relative ml-auto flex-1 md:grow-0'>
											<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
											<Input
												type='search'
												placeholder='Search...'
												className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
												value={searchTerm}
												onChange={(e: ChangeEvent<HTMLInputElement>) =>
													setSearchTerm(e.target.value)
												}
											/>
										</div>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant='outline'
													size='sm'
													className='h-8 gap-1'
												>
													<ListFilter className='h-3.5 w-3.5' />
													<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
														Filter
													</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='end'>
												<DropdownMenuLabel>Filter by status</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuCheckboxItem
													checked={selectedFilters.status.includes(
														'In process'
													)}
													onCheckedChange={(checked: boolean) =>
														handleStatusFilterChange('In process', checked)
													}
												>
													In process
												</DropdownMenuCheckboxItem>
												<DropdownMenuCheckboxItem
													checked={selectedFilters.status.includes('Completed')}
													onCheckedChange={(checked: boolean) =>
														handleStatusFilterChange('Completed', checked)
													}
												>
													Completed
												</DropdownMenuCheckboxItem>
												<DropdownMenuCheckboxItem
													checked={selectedFilters.status.includes('Failed')}
													onCheckedChange={(checked: boolean) =>
														handleStatusFilterChange('Failed', checked)
													}
												>
													Failed
												</DropdownMenuCheckboxItem>
											</DropdownMenuContent>
										</DropdownMenu>

										<CreateEntity
											title='Add Task'
											description='Add a new task'
											className='bg-white text-black flex justify-center items-center hover:bg-white'
										></CreateEntity>
									</div>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Name</TableHead>
												<TableHead>Status</TableHead>
												<TableHead className='hidden md:table-cell'>
													Creator
												</TableHead>
												<TableHead className='hidden md:table-cell'>
													Created at
												</TableHead>
												<TableHead>
													<span className='sr-only'>Actions</span>
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredTasks.map(task => (
												<Task
													key={task.id}
													task={task}
													updateTask={updateTask}
													deleteTask={deleteTask}
												/>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='history'>
							<History
								tasks={tasks}
								selectedTask={selectedTask}
								setSelectedTaskId={setSelectedTaskId}
								rollbackTask={rollbackTask}
							/>
						</TabsContent>
						<TabsContent value='members'>
							<Card x-chunk='dashboard-01-chunk-5'>
								<CardHeader>
									<CardTitle>Project Members</CardTitle>
								</CardHeader>
								<CardContent className='grid gap-8'>
									{members.map(member => (
										<Member
											key={member.id}
											member={member}
											removeMember={removeMember}
										/>
									))}
									<CreateEntity
										title='Add Member'
										description='Add a new member'
										className='bg-white text-black flex justify-center items-center hover:bg-white'
									></CreateEntity>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	)
}
