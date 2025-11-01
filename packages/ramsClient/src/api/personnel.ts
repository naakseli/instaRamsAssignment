import type { PersonnelResponse } from '@insta/ramsbackend/src/types/api.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './apiClient'

export type Personnel = PersonnelResponse

export async function getPersonnel(): Promise<Personnel[]> {
	const { data } = await apiClient.get<Personnel[]>(`/personnel`)
	return data
}

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
}): Promise<Personnel> {
	const { data } = await apiClient.put<Personnel>(`/personnel/${id}`, {
		personalId,
		fullName,
		email,
	})
	return data
}

export function usePersonnel() {
	return useQuery({
		queryKey: ['all-personnel'],
		queryFn: getPersonnel,
	})
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
