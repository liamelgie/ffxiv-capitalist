import useItemInfo from "./useItemInfo"
import GilIcon from "./GilIcon"
import styles from "../styles/ItemInfo.module.css"

const ItemInfo = (props) => {
    const { id } = props
    const { info, isLoading, isError } = useItemInfo(id)
    if (isError) return (
        <div>
            <h2>Info</h2>
            <div>Failed to load</div>
        </div>
    )
    if (isLoading) return (
        <div>
            <h2>Info</h2>
            <div>Loading...</div>
        </div>
    )
    return (
        <div className={styles.itemInfoCard} style={{'width': '500px'}}>
            <div className={styles.mainIconContainer}>
                <img alt={`${info.item.Name} icon`} className={styles.mainIcon} src={`https://xivapi.com/${info.item.IconHD}`} />
            </div>
            <div className={styles.mainInfo}>
                <h2>{ info.item.Name }</h2>
                <p>{ info.item.Description }</p>
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