import useSWR from 'swr'

export default function useListingData (id, world) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/universalis/listings/${world}/${id}`, fetcher,  { refreshInterval: 300000 })
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}