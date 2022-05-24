import { useState, useCallback, useRef } from 'react'
import { debounce } from "lodash"
import styles from '../styles/SearchBar.module.css'
import useSearchData from './useSearchData'
import SearchResults from './SearchResults'
import useOnClickOutside from '../hooks/useOnClickOutside'

const SearchBar = () => {
    const [ searchParam, setSearchParam ] = useState('')
    const [ localSearchValue, setLocalSearchValue ] = useState('')
    const { data, isLoading, isError } = useSearchData(searchParam)
    const debounceOnChange = useCallback(debounce(value => setSearchParam(value), 250), [])
    const [ isSearchFocused, setSearchFocused ] = useState(false)
    const focusRef = useRef()
    useOnClickOutside(focusRef, useCallback(() => setSearchFocused(false), []))
    return (
        <div className={styles.container} ref={focusRef}>
            <input 
                className={styles.searchInput}
                type="text" 
                value={localSearchValue} 
                onChange={(event) => {
                    setLocalSearchValue(event.target.value)
                    debounceOnChange(event.target.value)
                }}
                onFocus={(e) => setSearchFocused(true)}
            />
            { !!localSearchValue && isSearchFocused && <SearchResults data={data} isLoading={isLoading} isError={isError} setSearchFocused={setSearchFocused} isSearchFocused={isSearchFocused} />}
        </div>
    )
}

export default SearchBar