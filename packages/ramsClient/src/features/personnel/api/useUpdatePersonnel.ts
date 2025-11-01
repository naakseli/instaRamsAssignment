import { PersonnelDTO } from '@insta/shared'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../api/apiClient'

export async function updatePersonnel({
	id,
	personalId,
	fullName,
	email,
}: {
	id: string
	personalId?: string
	fullName?: string
	email?: string
}): Promise<PersonnelDTO> {
	const { data } = await apiClient.put<PersonnelDTO>(`/personnel/${id}`, {
		personalId,
		fullName,
		email,
	})
	return data
}

export function useUpdatePersonnel() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			id,
			personalId,
			fullName,
			email,
		}: {
			id: string
			personalId?: string
			fullName?: string
			email?: string
		}) => updatePersonnel({ id, personalId, fullName, email }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all-personnel'] })
		},
	})
}
