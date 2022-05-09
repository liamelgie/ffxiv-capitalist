import findDataCenter from '../../../../utils/findDataCenter';
import Universalis from 'universalis.js';

export default async function handler(req, res) {
    const { param } = req.query
    if (!param[0] || !param[1]) return res.status(404)
    const uni = new Universalis()
    const dataCenter = await findDataCenter(param[0])
    console.log(param)
    try {
        const localSales = await uni.getSales(param[0], param[1])
        const sortedLocalSales = uni.sortSalesByDay(localSales)
        const crossSales = await uni.getSales(dataCenter, param[1])
        const sortedCrossSales = uni.sortSalesByDay(crossSales)
        return res.status(200).json({ local: { dates: sortedLocalSales, sales: localSales.entries }, cross: { dates: sortedCrossSales, sales: crossSales.entries }})
    } catch(error) {
        res.status(502).json({ error })
    }
  }  