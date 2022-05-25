import styles from '../styles/Table.module.css'

const ListingTablePlaceholder = ({ limit, crossWorld, condensed }) => {
    const dummyRows = [...Array(limit).keys()].map((d, i) => {
        return (
            <tr key={i}>
                <td className={styles.hqColumn}><span>P</span></td>
                <td><span>13900</span></td>
                <td><span>1</span></td>
                <td><span>13900</span></td>
                {condensed ? '' : <td><span>Rowena</span></td>}
                {crossWorld && <td><span>{'Rowena'}</span></td>}            
            </tr>
        )
    })
    return (
        <table className={condensed ? styles.tablePlaceholderCondensed : styles.tablePlaceholder}>
            <thead>
                <tr>
                    <th className={styles.hqColumn}>HQ</th>
                    <th>Price per</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    {condensed ? '' : <th>Retainer</th> }
                    {crossWorld && <th>World</th>}
                </tr>
            </thead>
            <tbody>{dummyRows}</tbody>
        </table>
    )
}
export default ListingTablePlaceholder