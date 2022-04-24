import useItemInfo from "./useItemInfo"

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
        <div>
            <h2>Info</h2>
            <h3>ID: { info.item.ID }</h3>
            <h3>Name: { info.item.Name }</h3>
            <h3>Description: { info.item.Description }</h3>
        </div>
    )
}
export default ItemInfo