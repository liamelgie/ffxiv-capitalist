import findDataCenter from '../../../../../utils/findDataCenter';
import Universalis from 'universalis.js';
import dayjs from 'dayjs'
const isBetween = require('dayjs/plugin/isBetween')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)

const calcAverageSalePrice = (salesData) => {
    const nqSales = salesData.entries.filter(entries => entries.hq === false)
    const hqSales = salesData.entries.filter(entries => entries.hq === true)
    const nqSalesPrices = nqSales.map(sale => sale.pricePerUnit)
    const nqSum = Math.round(nqSalesPrices.reduce(( previousValue, currentValue ) => previousValue + currentValue, 0) / nqSalesPrices.length)
    let averages = { nq: nqSum, hq: 0 }
    if (hqSales.length > 0) {
        const hqSalesPrices = hqSales.map(sale => sale.pricePerUnit)
        const hqSum = Math.round(hqSalesPrices.reduce(( previousValue, currentValue ) => previousValue + currentValue, 0) / nqSalesPrices.length)
        averages = { ...averages, hq: hqSum}
    }
    return averages
}

const getSalesWithinPreviousDays = (salesData, timitLimitInDays) => {
    const limitInSeconds = (timitLimitInDays * 86400)
    const epochRangeLimit = Math.round(Date.now() / 1000) - limitInSeconds
    const filteredEnteries = salesData.entries.filter(entries => entries.timestamp > epochRangeLimit)
    return { ...salesData, entries: filteredEnteries}
}

const calcAverageSalesPerDay = async (salesData) => { // TODO: Make timeframe configurable
    const uni = new Universalis()
    const sortedSalesData = await uni.sortSalesByDay(salesData)
    const dateSevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const filteredDates = Object.keys(sortedSalesData).
        filter((date) => {
            return dayjs(date).isBetween(dayjs(dateSevenDaysAgo), dayjs(), 'day', '[]')
        }).
        reduce((cur, key) => { return Object.assign(cur, { [key]: sortedSalesData[key] })}, {})
    let salesTotal = 0;
    for (const [date, sales] of Object.entries(filteredDates)) {
        salesTotal += sales.length
    }
    const average = salesTotal / 7
    return average
}

export default async function handler(req, res) {
    const { param } = req.query
    if (!param[0] || !param[1]) return res.status(404)
    const uni = new Universalis()
    const dataCenter = await findDataCenter(param[0])
    const previousDaysLimit = 7
    try {
        const localSales = await uni.getSales(param[0], param[1])
        const sortedLocalSales = uni.sortSalesByDay(localSales)
        const crossSales = await uni.getSales(dataCenter, param[1])
        const sortedCrossSales = uni.sortSalesByDay(crossSales)
        const localAverages = calcAverageSalePrice(getSalesWithinPreviousDays(localSales, previousDaysLimit))
        const crossAverages = calcAverageSalePrice(getSalesWithinPreviousDays(crossSales, previousDaysLimit))
        return res.status(200).json({ 
            local: { 
                averagePrice: { ...localAverages },
                averageSalesPerDay: await calcAverageSalesPerDay(localSales)
            }, 
            cross: { 
                averagePrice: { ...crossAverages },
                averageSalesPerDay: await calcAverageSalesPerDay(crossSales)
            } 
        })
    } catch(error) {
        res.status(502).json({ error })
    }
}