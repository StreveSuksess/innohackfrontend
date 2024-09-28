import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AccountRoute = () => {
	const navigate = useNavigate()
	const token = Cookies.get('Authorization')

	useEffect(() => {
		if (!token) navigate('/login')
	}, [token, navigate])

	return <Outlet />
}

export default AccountRoute
