import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Root from './components/Root'
import AuthenticationPage from "@/pages/Auth.tsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />
	},
	{
		path: '/login',
		element: <AuthenticationPage />
	}
])

const App = () => {
	return <RouterProvider router={router} />
}

export default App
