import useSWR from 'swr'

export default function useInsights (id, world) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(id ? `/api/universalis/sales/insights/${world}/${id}`: null, fetcher,  { refreshInterval: 300000 })
  return {
    insights: data,
    isLoading: !error && !data,
    isError: error
  }
}