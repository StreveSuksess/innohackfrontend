import Sidebar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'

const Main = () => {
	return (
		<div className='flex bg-muted/40'>
			<Sidebar />

			<div>
				<Outlet />
			</div>
		</div>
	)
}

export default Main
