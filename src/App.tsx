import './App.css'
import Main from './pages/Main'
import { AuthenticationPage } from '@/pages/AuthentificationPage.tsx'
import { SignUpPage } from '@/pages/SignUp.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
	{
		path: '/login',
		element: <AuthenticationPage />,
	},
	{
		path: '/signup',
		element: <SignUpPage />,
	},
])

const App = () => {
	return <RouterProvider router={router} />
}

export default App
