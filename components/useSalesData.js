import useSWR from 'swr'

export default function useSalesData (id, world) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/universalis/sales/${world}/${id}`, fetcher,  { refreshInterval: 300000 })
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}