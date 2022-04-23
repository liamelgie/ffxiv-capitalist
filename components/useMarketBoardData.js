import useSWR from 'swr'

export default function useMarketBoardData (id, world) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/universalis/item/${world}/${id}`, fetcher)
  return {
    marketBoardData: data,
    isLoading: !error && !data,
    isError: error
  }
}