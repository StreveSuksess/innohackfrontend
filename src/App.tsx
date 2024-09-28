import './App.css'
import Main from './pages/Main'
import { AuthenticationPage } from '@/pages/AuthentificationPage.tsx'
import { SignUpPage } from '@/pages/SignUp.tsx'
import { Tasks } from '@/pages/Tasks.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<AuthenticationPage />} />
				<Route path='/signup' element={<SignUpPage />} />

				<Route path='/' element={<Main />}>
					<Route path='/tasks' element={<Tasks />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
