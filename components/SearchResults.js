import styles from '../styles/SearchBar.module.css'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

const SearchResults = ({ data, isLoading, isError, isSearchFocused, setSearchFocused}) => {
    if (isLoading) {
        return (
            <div className={styles.searchBox}>
                <div className={styles.loaderContainer}>
                    <Image className={styles.loading} src={"/loading.gif"} height={10} width={30} alt="loading"/>
                </div>
            </div>
        )
    }
    if (isError) {
        return (
            <div className={styles.searchBox}>
                <h1>Error</h1>
            </div>        
        )
    }
    let results = data.results.map((result, i) => 
        <div className={styles.searchResult} key={i}>
            <img className={styles.resultIcon} src={`https://xivapi.com/${result.Icon}`} />
            <Link href={`/item/${result.ID}`} prefetch={false}><a className={styles.resultName} onClick={() => setSearchFocused(false)}>{result.Name}</a></Link>
            <div className={styles.resultMisc}>{result.ID}</div>
        </div>
    )
    return (
        <div className={classNames(styles.searchBox, { [styles.hidden]: !isSearchFocused } )}>
            { results.length > 0 && results }
            { results.length === 0 && <div className={styles.loaderContainer}> {'No results'} </div>}
        </div>
    )
}

export default SearchResults