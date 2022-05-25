import styles from '../styles/Table.module.css'
import useListingData from './useListingData'
import GilIcon from './GilIcon'
import HQIcon from './HQIcon'
import ListingTablePlaceholder from './ListingTablePlaceholder'

const ListingTable = ({ id, world, limit, crossWorld, hq }) => {
    const { data, isLoading, isError } = useListingData(id, world)
    if (isError) return (
        <div>
            <div>Failed to load listings</div>
        </div>
    )
    if (isLoading) return (
        <ListingTablePlaceholder limit={limit} crossWorld={crossWorld} />
    )
    let listings = crossWorld ? data.cross.listings : data.local.listings
    if (hq) {
        const hqListings = listings.filter(listing => listing.hq === true) // Filter out non-HQ listings if specified
        if (hqListings.length > 0) listings = hqListings // If item has no hq listings, return the original array
    }
    const rows = listings.slice(0, limit).map((listing, i) =>
        <tr key={i}>
            <td className={styles.hqColumn}>{listing.hq ? <HQIcon height={15} width={15} theme='light' /> : '' }</td>
            <td>{Number(listing.pricePerUnit).toLocaleString('en-US')}<GilIcon height={15} width={15}/></td>
            <td>{listing.quantity}</td>
            <td>{Number(listing.total).toLocaleString('en-US')}<GilIcon height={15} width={15}/></td>
            <td>{listing.retainerName}</td>
            {crossWorld && <td>{listing.worldName}</td>}
        </tr>
    )
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.hqColumn}>HQ</th>
                    <th>Price per</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Retainer</th>
                    {crossWorld && <th>World</th>}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}
export default ListingTable