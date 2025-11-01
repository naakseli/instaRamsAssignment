import { FactoryDTO } from '@insta/shared'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../api/apiClient'

export async function getFactories(): Promise<FactoryDTO[]> {
	const { data } = await apiClient.get<FactoryDTO[]>(`/factories`)
	return data
}

export function useFactories() {
	return useQuery({
		queryKey: ['all-factories'],
		queryFn: getFactories,
	})
}
