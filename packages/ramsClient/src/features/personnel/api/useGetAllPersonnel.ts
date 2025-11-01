import { PersonnelResponse } from '@insta/ramsbackend/src/types/api.type'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../api/apiClient'

export type Personnel = PersonnelResponse

export async function getPersonnel(): Promise<Personnel[]> {
	const { data } = await apiClient.get<Personnel[]>(`/personnel`)
	return data
}

export function useGetAllPersonnel() {
	return useQuery({
		queryKey: ['all-personnel'],
		queryFn: getPersonnel,
	})
}
