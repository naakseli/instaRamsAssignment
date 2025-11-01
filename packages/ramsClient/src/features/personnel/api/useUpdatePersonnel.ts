import { PersonnelResponse } from '@insta/ramsbackend/src/types/api.type'
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
}): Promise<PersonnelResponse> {
	const { data } = await apiClient.put<PersonnelResponse>(`/personnel/${id}`, {
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
