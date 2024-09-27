import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Root from './components/Root'
import {AuthenticationPage} from "@/pages/AuthentificationPage.tsx";
import {SignUpPage} from "@/pages/SignUp.tsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />
	},
	{
		path: '/login',
		element: <AuthenticationPage />
	},
	{
		path: '/signup',
		element: <SignUpPage />
	}
])

const App = () => {
	return <RouterProvider router={router} />
}

export default App
