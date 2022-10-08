import { useQuery } from '@tanstack/react-query'
import { UserService } from '../services/user.service'

export const useProfile = () => {
	const { data } = useQuery(['profile'], () => UserService.getProfile())
	return { user: data }
}
