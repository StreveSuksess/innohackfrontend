import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Root from './components/Root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />
	}
])

const App = () => {
	return <RouterProvider router={router} />
}

export default App
