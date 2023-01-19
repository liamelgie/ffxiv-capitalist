import useSWR from 'swr'

export default function useRecentlyUpdatedItemsGeneric ({refreshInterval=30}) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/universalis/recent/`, fetcher,  { refreshInterval: refreshInterval * 1000  })
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}