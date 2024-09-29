import axios from 'axios'
import Cookies from 'js-cookie'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AcceptInvitation = () => {
	const { projectId } = useParams()
	const navigate = useNavigate()

	const handleAccept = useCallback(async () => {
		const token = Cookies.get('Authorization')

		await axios.post(
			`${import.meta.env.VITE_API_URL}/project/apply-invite/${projectId}`,
			{},
			{
				headers: {
					Authorization: token,
				},
			}
		)
		navigate('/')
	}, [projectId, navigate])

	useEffect(() => {
		handleAccept()
	}, [handleAccept])

	return <div></div>
}

export default AcceptInvitation
