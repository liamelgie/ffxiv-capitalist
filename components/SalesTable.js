import styles from '../styles/Table.module.css'
import useSalesData from './useSalesData'
import GilIcon from './GilIcon'
import HQIcon from './HQIcon'
import dayjs from 'dayjs'
import SalesTablePlaceholder from './SalesTablePlaceholder'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const SalesTable = (props) => {
    const { id, world, limit, crossWorld, hq } = props
    const { data, isLoading, isError } = useSalesData(id, world)
    if (isError) return (
        <div>
            <div>Failed to load sales</div>
        </div>
    )
    if (isLoading) return (
        <SalesTablePlaceholder limit={limit} crossWorld={crossWorld} />
    )
    let sales = crossWorld ? data.cross.sales : data.local.sales
    if (hq) {
        const hqSales = sales.filter(sale => sale.hq === true) // Filter out non-HQ sales if specified
        if (hqSales.length > 0) sales = hqSales // If item has no hq sales, return the orignal array
    }
    const rows = sales.slice(0, limit).map((sale, i) =>
        <tr key={i}>
            <td className={styles.hqColumn}>{sale.hq ? <HQIcon height={15} width={15} theme='light' /> : ''}</td>
            <td>{Number(sale.pricePerUnit).toLocaleString('en-US')}<GilIcon height={15} width={15}/></td>
            <td>{sale.quantity}</td>
            <td>{Number(sale.pricePerUnit * sale.quantity).toLocaleString('en-US')}<GilIcon height={15} width={15}/></td>
            <td>{dayjs().to(sale.timestamp * 1000)}</td>
            {crossWorld && <td>{sale.worldName}</td>}
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
                    <th>Date</th>
                    {crossWorld && <th>World</th>}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}
export default SalesTable