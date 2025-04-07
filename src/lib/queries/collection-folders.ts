import request from '@/config/axios'
import { useQuery } from '@tanstack/vue-query'

export const useGetCollectionsQuery = ({
  hasCollections = false,
  enabled = true,
  ...options
}: {
  hasCollections?: boolean
  enabled?: boolean
}) => {
  return useQuery({
    enabled,
    queryKey: ['collections'],
    queryFn: () => request({ url: `/resource-collections` }),
    ...options,
  })
}
