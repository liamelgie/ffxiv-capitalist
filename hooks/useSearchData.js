import useSWR from 'swr'

export default function useSearchData (searchString) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(searchString ? `/api/xiv/search?string=${searchString}` : null, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}