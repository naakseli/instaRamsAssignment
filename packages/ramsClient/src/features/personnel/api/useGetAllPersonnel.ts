import { PersonnelDTO } from '@insta/shared'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../api/apiClient'

export async function getPersonnel(): Promise<PersonnelDTO[]> {
	const { data } = await apiClient.get<PersonnelDTO[]>(`/personnel`)
	return data
}

export function useGetAllPersonnel() {
	return useQuery({
		queryKey: ['all-personnel'],
		queryFn: getPersonnel,
	})
}
