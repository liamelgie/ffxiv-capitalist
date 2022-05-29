import styles from '../styles/Table.module.css'
import useListingData from '../hooks/useListingData'
import GilIcon from './GilIcon'
import HQIcon from './HQIcon'
import ListingTablePlaceholder from './ListingTablePlaceholder'

const ListingTableCondensed = ({ id, world, limit, crossWorld, hq }) => {
    const { data, isLoading, isError } = useListingData(id, world)
    if (isError) return <div><div>Failed to load listings</div></div>
    if (isLoading) return <ListingTablePlaceholder limit={limit} crossWorld={crossWorld} condensed={true} />
    const listings = crossWorld ? data.cross.listings : data.local.listings
    if (hq) {
        const hqListings = listings.filter(listing => listing.hq === true) // Filter out non-HQ listings if specified
        if (hqListings.length > 0) listings = hqListings // If item has no hq listings, return the original array
    }
    return (
        <table className={styles.tableCondensed}>
            <thead>
            <tr>
                <th>HQ</th>
                <th>Price Per</th>
                <th>Qty</th>
                <th><GilIcon height={20} width={20}/></th>
                {crossWorld && <th>World</th>}
            </tr>
            </thead>
            <tbody>
                {listings.length === 0 && <tr><td style={{textAlign: "center"}} colSpan={5}>There are currently no listings. Try again later.</td></tr>}
                {listings.slice(0, limit).map((listing, i) => {
                    return (
                        <tr key={i}>
                            <td style={{textAlign: 'center', maxWidth: '10px'}}>{listing.hq ? <HQIcon height={15} width={15} theme='light' /> : ''}</td>
                            <td>{Number(listing.pricePerUnit).toLocaleString('en-US')}</td>
                            <td style={{textAlign: 'center'}}>{listing.quantity}</td>
                            <td>{Number(listing.total).toLocaleString('en-US')}</td>
                            {crossWorld && <td>{listing.worldName}</td>}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default ListingTableCondensed