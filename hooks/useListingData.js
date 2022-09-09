import useSWR from 'swr'

export default function useListingData (id, world) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(id ? `/api/universalis/listings/${world}/${id}` : null, fetcher,  { refreshInterval: 300000 })
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}