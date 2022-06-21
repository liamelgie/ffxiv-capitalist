import useListingData from "../hooks/useListingData"
import ListingTableCondensed from "./ListingTableCondensed"
import ListingTablePlaceholder from "./ListingTablePlaceholder"
import GilIcon from "./GilIcon"
import styles from '../styles/QuickLook.module.css'

const QuickLook = ({ id, world, hq }) => {
    const { data, isLoading, isError } = useListingData(id, world)
    if (isError) return (
        <div>
            <div>Failed to load listings</div>
        </div>
    )
    if (isLoading) return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <h3>...</h3>
                <ListingTablePlaceholder limit={5} crossWorld={false} condensed={true} />
            </div>
            <div className={styles.tableContainer}>
                <h3>...</h3>
                <ListingTablePlaceholder limit={5} crossWorld={true} condensed={true} />
            </div>
            <div className={styles.potentialProfitContainer}>
                <span>Potential Profit: ...</span>
            </div>
        </div>
    )
    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <h3>{data.local.worldName}</h3>
                <ListingTableCondensed id={id} world={world}  limit={5} hq={hq} />
            </div>
            <div className={styles.tableContainer}>
                <h3>{data.cross.dcName}</h3>
                <ListingTableCondensed id={id} world={world} limit={5} crossWorld={true} hq={hq} />
            </div>
            <div className={styles.potentialProfitContainer}>
                <span>Potential Profit:&nbsp; 
                    {hq
                        ? data.local && Number(data.local.cheapestHQ - data.cross.cheapestHQ).toLocaleString('en-US') 
                        : data.local && Number(data.local.cheapest - data.cross.cheapest).toLocaleString('en-US') 
                    }
                    <GilIcon height={20} width={20}/>
                </span>
            </div>
        </div>
    )
}
export default QuickLook