import styles from '../styles/RecentlyUpdated.module.css'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import useRecentlyUpdatedItems from '../hooks/useRecentlyUpdatedItems'
import useRecentlyUpdatedItemsGeneric from '../hooks/useRecentlyUpdatedItemsGeneric'
import RecentlyUpdatedItem from './RecentlyUpdatedItem'
import TimeUntilRefreshIndicator from './TimeUntilRefreshIndicator'

const RecentlyUpdatedTable = ({ world, limit=20, refreshInterval }) => {
    if (world) {
        const { data, isLoading, isError } = useRecentlyUpdatedItems({world, refreshInterval})
        if (isLoading) return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}>
                    <Image className={styles.loading} src={"/loading.gif"} height={10} width={30} alt="loading"/>
                </div>
            </div>
        )
        if (isError) {
            return <h1>MONKA2</h1>
        }
        if (data.items) {
            return (
                <div className={styles.container}>
                    <TimeUntilRefreshIndicator refreshInterval={refreshInterval} />
                    {data.items.length === 0 && <div className={styles.loaderContainer}> {'No results'} </div>}
                    {data.items.slice(0, limit).map((item) => (
                        <RecentlyUpdatedItem key={item.itemID} id={item.itemID} />
                    ))}
                </div>
            )
        }
    } else {
        const { data, isLoading, isError } = useRecentlyUpdatedItemsGeneric({refreshInterval})
        if (isLoading) {
            return <h1>MONKA</h1>
        }
        if (isError) {
            return <h1>MONKA2</h1>
        }
        if (data.items) {
            return (
                <div className={styles.container}>
                    <TimeUntilRefreshIndicator refreshInterval={refreshInterval} />
                    {data.length === 0 && <div className={styles.loaderContainer}> {'No results'} </div>}
                    {data.items.slice(0, limit).map((item) => (
                        <RecentlyUpdatedItem key={item} id={item} />
                    ))}
                </div>
            )
        }
    }
}

export default RecentlyUpdatedTable