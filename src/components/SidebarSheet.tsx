import Sidebar from './Sidebar'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { SidebarIcon } from 'lucide-react'

const SidebarSheet = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Button variant='secondary'>
					<SidebarIcon />
				</Button>
			</SheetTrigger>

			<SheetContent side='left' className='w-[265px]'>
				<Sidebar />
			</SheetContent>
		</Sheet>
	)
}

export default SidebarSheet
