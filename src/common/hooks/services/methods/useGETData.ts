'use client'

import { useQuery } from '@tanstack/react-query'
import baseAPI from '../baseApi'

export const useGetData = <T>(url: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const res = await baseAPI.get<{ data: T }>(url)
      return res.data.data
    }
  })

  return { data, loading: isLoading, refetch }
}
