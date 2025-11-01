import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../api/apiClient'

export const useDeleteFactory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => {
			const { data } = await apiClient.delete<number>(`/factories/${id}`)
			return data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all-factories'] })
		},
	})
}
