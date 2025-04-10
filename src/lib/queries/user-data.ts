import request from '@/config/axios'
import { useQuery } from '@tanstack/vue-query'

export const useGetAllUserData = () => {
  return useQuery({
    queryKey: ['user-data'],
    queryFn: () => request({ url: `/users/all` }),
  })
}
