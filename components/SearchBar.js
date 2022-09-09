import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { debounce } from "lodash"
import styles from '../styles/SearchBar.module.css'
import useSearchData from '../hooks/useSearchData'
import SearchResults from './SearchResults'
import useOnClickOutside from '../hooks/useOnClickOutside'

const SearchBar = () => {
    const router = new useRouter()
    const [ searchParam, setSearchParam ] = useState('')
    const [ localSearchValue, setLocalSearchValue ] = useState('')
    const { data, isLoading, isError } = useSearchData(searchParam)
    const debounceOnChange = useCallback(debounce(value => setSearchParam(value), 250), [])
    const [ isSearchFocused, setSearchFocused ] = useState(false)
    const focusRef = useRef()
    useOnClickOutside(focusRef, useCallback(() => setSearchFocused(false), []))
    const handleKey = (e)  => {
        const keyCode = e.keyCode || e.which;
        if (keyCode === 13 && data) {
            router.push(`/item/${data.results[0].ID}`).then(() => {
                e.target.blur()
                setSearchFocused(false)
            })
        }
    }
    return (
        <div className={styles.container} ref={focusRef}>
            <input 
                className={styles.searchInput}
                type="text" 
                value={localSearchValue}
                placeholder="Search"
                onChange={(event) => {
                    setLocalSearchValue(event.target.value)
                    debounceOnChange(event.target.value)
                }}
                onKeyUp={(e) => handleKey(e)}
                onFocus={(e) => setSearchFocused(true)}
            />
            { !!localSearchValue && isSearchFocused && <SearchResults data={data} isLoading={isLoading} isError={isError} setSearchFocused={setSearchFocused} isSearchFocused={isSearchFocused} />}
        </div>
    )
}

export default SearchBar