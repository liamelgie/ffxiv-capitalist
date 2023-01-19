import useSWR from 'swr'

export default function useRecentlyUpdatedItems ({world, refreshInterval=30}) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(world ? `/api/universalis/recent/${world}/` : null, fetcher,  { refreshInterval: refreshInterval * 1000 })
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}