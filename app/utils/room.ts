import { useRouteLoaderData } from 'react-router'
import { type loader as rootLoader } from '../root'

export function useOptionalUser() {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	// if (!data || !isUser(data.user)) {
	// 	return undefined
	// }
	if (!data) {
        return undefined
    }
	return data.user
}

export function useUser() {
	const maybeUser = useOptionalUser()
	if (!maybeUser) {
		throw new Error(
			'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.',
		)
	}
	return maybeUser
}