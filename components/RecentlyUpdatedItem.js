import styles from '../styles/RecentlyUpdated.module.css'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import useItemInfo from '../hooks/useItemInfo'

const RecentlyUpdatedItem = ({ id }) => {
    const { info, isLoading, isError } = useItemInfo(id)
    if (isLoading) {
       return <span key={id}>
        <Image className={styles.loading} src={"/loading.gif"} height={10} width={30} alt="loading"/>
       <br/></span>
    }
    if (isError) {
        console.log(id)
        return <h1 key={id}>MONKA</h1>
    }

    return (
        <Link href={`/item/${info.item.ID}`} prefetch={false}>
            <div className={styles.searchResult} key={info.ID}>
                <img className={styles.resultIcon} src={`https://xivapi.com/${info.item.Icon}`} />
                <a className={styles.resultName}>{info.item.Name}</a>
                <div className={styles.resultMisc}>{info.item.ID}</div>
            </div>
        </Link>
    )
}

export default RecentlyUpdatedItem