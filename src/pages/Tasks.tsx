import CreateEntity from '@/components/CreateEntity'
import { Member } from '@/components/Member.tsx'
import { Task } from '@/components/Task.tsx'
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
import { Input } from '@/components/ui/input.tsx'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
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
import { Link } from 'react-router-dom'

export const description =
	'An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.'

export const Tasks = () => {
	const projectName = 'Project Name'
	const deskName = 'Desk Name'

	return (
		<div className='flex min-h-screen w-full'>
			<div className='flex flex-col sm:gap-4 sm:py-4 w-full'>
				<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
					<Sheet>
						<SheetTrigger asChild>
							<Button size='icon' variant='outline' className='sm:hidden'>
								<PanelLeft className='h-5 w-5' />
								<span className='sr-only'>Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left' className='sm:max-w-xs'>
							<nav className='grid gap-6 text-lg font-medium'>
								<Link
									to='#'
									className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
								>
									<Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
									<span className='sr-only'>Acme Inc</span>
								</Link>
								<Link
									to='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<Home className='h-5 w-5' />
									Dashboard
								</Link>
								<Link
									to='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<ShoppingCart className='h-5 w-5' />
									Orders
								</Link>
								<Link
									to='#'
									className='flex items-center gap-4 px-2.5 text-foreground'
								>
									<Package className='h-5 w-5' />
									Products
								</Link>
								<Link
									to='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<Users2 className='h-5 w-5' />
									Customers
								</Link>
								<Link
									to='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<LineChart className='h-5 w-5' />
									Settings
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<Breadcrumb className='hidden md:flex'>
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
								<TabsTrigger value='hierarchy'>History</TabsTrigger>
								<TabsTrigger value='members'>Project members</TabsTrigger>
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
												<DropdownMenuLabel>Filter by</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuCheckboxItem checked>
													Status
												</DropdownMenuCheckboxItem>
												<DropdownMenuCheckboxItem>
													Date
												</DropdownMenuCheckboxItem>
												<DropdownMenuCheckboxItem>
													Name
												</DropdownMenuCheckboxItem>
											</DropdownMenuContent>
										</DropdownMenu>

										<CreateEntity
											title='Add task'
											description='Add new task'
											className='bg-white text-black flex justify-center items-center hover:bg-white'
										>
											<Select>
												<SelectTrigger className='w-[100%]'>
													<SelectValue placeholder='Select a status' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value='In process'>
															In process
														</SelectItem>

														<SelectItem value='Completed'>Completed</SelectItem>
														<SelectItem value='Failed'>Failed</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</CreateEntity>
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
											<Task />
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value={'members'}>
							<Card x-chunk='dashboard-01-chunk-5'>
								<CardHeader>
									<CardTitle>Recent Sales</CardTitle>
								</CardHeader>
								<CardContent className='grid gap-8'>
									<Member />
									<Member />
									<Member />
									<Member />
									<Member />
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	)
}
