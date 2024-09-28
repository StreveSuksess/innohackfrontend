import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthRoute = () => {
	const navigate = useNavigate()
	const token = Cookies.get('Authorization')

	useEffect(() => {
		if (token) navigate('/tasks')
	}, [token, navigate])

	return <Outlet />
}

export default AuthRoute
