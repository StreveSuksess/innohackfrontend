import './App.css'
import AccountRoute from './pages/AccountRoute'
import AuthRoute from './pages/AuthRoute'
import Main from './pages/Main'
import { AuthenticationPage } from '@/pages/AuthenticationPage.tsx'
import { SignUpPage } from '@/pages/SignUp.tsx'
import { Tasks } from '@/pages/Tasks.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AccountRoute />}>
					<Route path='/' element={<Main />}>
						<Route path='/tasks' element={<Tasks />} />
					</Route>
				</Route>

				<Route element={<AuthRoute />}>
					<Route path='/login' element={<AuthenticationPage />} />
					<Route path='/signup' element={<SignUpPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
