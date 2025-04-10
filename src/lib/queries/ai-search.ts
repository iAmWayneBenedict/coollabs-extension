import request from '@/config/axios'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export const useGetAISearch = ({ params }: { params: any }) => {
  const searchParams = computed(() => new URLSearchParams({ query: params.value }).toString())
  const url = computed(() => `/ai/extension?${searchParams.value}`)
  return useQuery({
    enabled: computed(() => !!params.value),
    queryKey: computed(() => ['ai-search', params]),
    queryFn: () => request({ url: url.value }),
    retry: 0,
    refetchOnWindowFocus: false,
  })
}
