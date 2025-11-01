import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../api/apiClient'

export const useDeletePersonnel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => {
			const { data } = await apiClient.delete<number>(`/personnel/${id}`)
			return data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all-personnel'] })
		},
	})
}
