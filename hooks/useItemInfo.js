import useSWR from 'swr'

export default function useItemInfo (id) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(id ? `/api/xiv/item/${id}`: null, fetcher)
  return {
    info: data,
    isLoading: !error && !data,
    isError: error
  }
}