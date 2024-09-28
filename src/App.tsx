import './App.css'
import Main from './pages/Main'
import { AuthenticationPage } from '@/pages/AuthentificationPage.tsx'
import { SignUpPage } from '@/pages/SignUp.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Tasks} from "@/pages/Tasks.tsx";

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
	{
		path: '/tasks',
		element: <Tasks />,
	},
])

const App = () => {
	return <RouterProvider router={router} />
}

export default App
