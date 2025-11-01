import { FactoryResponse } from '@insta/ramsbackend/src/types/api.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../api/apiClient'

export async function updateFactory({
	id,
	name,
	timeZone,
}: {
	id: string
	name: string
	timeZone: string
}) {
	const { data } = await apiClient.put<FactoryResponse>(`/factories/${id}`, { name, timeZone })
	return data
}

export function useUpdateFactory() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, name, timeZone }: { id: string; name: string; timeZone: string }) =>
			updateFactory({ id, name, timeZone }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all-factories'] })
		},
	})
}
