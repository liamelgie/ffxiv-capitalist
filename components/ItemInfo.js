import Head from "next/head"
import useItemInfo from "./useItemInfo"
import GilIcon from "./GilIcon"
import styles from "../styles/ItemInfo.module.css"

const ItemInfo = ({ id }) => {
    const { info, isLoading, isError } = useItemInfo(id)
    if (isError) return (
        <div>
            <div>Failed to load</div>
        </div>
    )
    if (isLoading) return (
        <div>
            <div>Getting item info...</div>
        </div>
    )
    if (info.item.Error) return (
        <div>
            <div>Failed to load</div>
        </div>
    )
    return (
        <div className={styles.itemInfoCard}>
            <Head>
                <title>{info.item.Name}</title>
            </Head>
            <h2 className={styles.itemName}>{ info.item.Name }</h2>
            <div className={styles.mainIconContainer}>
                <img alt={`${info.item.Name} icon`} className={styles.mainIcon} src={`https://xivapi.com/${info.item.IconHD}`} />
            </div>
            <div className={styles.mainInfo}>
                <p>{ info.item.Description || 'No description available.' }</p>
            </div>
            <div className={styles.miscInfo}>
                <span>ID: { info.item.ID }</span>
                <span>
                    <img alt={`${info.item.ItemUICategory.Name} icon`} className={styles.catIcon} src={`https://xivapi.com/${info.item.ItemUICategory.IconHD}`} />
                    { info.item.ItemUICategory.Name }
                </span>
                <span>
                    { info.item.PriceLow }<GilIcon height={20} width={20} />
                </span>
            </div>
        </div>
    )
}
export default ItemInfo