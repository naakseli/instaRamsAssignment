import { FactoryResponse } from '@insta/ramsbackend/src/types/api.type'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../apiClient'

export async function getFactories(): Promise<FactoryResponse[]> {
	const { data } = await apiClient.get<FactoryResponse[]>(`/factories`)
	return data
}

export function useFactories() {
	return useQuery({
		queryKey: ['all-factories'],
		queryFn: getFactories,
	})
}
