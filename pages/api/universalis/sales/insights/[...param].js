import findDataCenter from '../../../../../utils/findDataCenter';
import Universalis from 'universalis.js';
import dayjs from 'dayjs'
const isBetween = require('dayjs/plugin/isBetween')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)

const getSalesWithinTimeframe = (salesData, timeframe) => {
    const timeframeInSeconds = (timeframe * 86400)
    const epochRangeLimit = Math.round(Date.now() / 1000) - timeframeInSeconds
    const filteredEnteries = salesData.entries.filter(entries => entries.timestamp > epochRangeLimit)
    return { ...salesData, entries: filteredEnteries}
}

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

const calcAverageSalesPerDay = async (salesData, timeframe) => {
    const uni = new Universalis()
    const sortedSalesData = await uni.sortSalesByDay(salesData)
    const dateXAgo = new Date(Date.now() - timeframe * 24 * 60 * 60 * 1000)
    const filteredDates = Object.keys(sortedSalesData).
        filter((date) => {
            return dayjs(date).isBetween(dayjs(dateXAgo), dayjs(), 'day', '[]')
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
        const crossSales = await uni.getSales(dataCenter, param[1])
        const localAverages = calcAverageSalePrice(getSalesWithinTimeframe(localSales, previousDaysLimit))
        const crossAverages = calcAverageSalePrice(getSalesWithinTimeframe(crossSales, previousDaysLimit))
        const localAverageSalesPerDay = await calcAverageSalesPerDay(localSales, previousDaysLimit)
        const crossAverageSalesPerDay = await calcAverageSalesPerDay(crossSales, previousDaysLimit)
        return res.status(200).json({ 
            local: { 
                averagePrice: { ...localAverages },
                averageSalesPerDay: localAverageSalesPerDay,
                stackSizeHistogram: {
                    regular: localSales.stackSizeHistogram,
                    nq: localSales.stackSizeHistogramNQ,
                    hq: localSales.stackSizeHistogramHQ
                },
                saleVelocity: {
                    regular: localSales.regularSaleVelocity,
                    nq: localSales.nqSaleVelocity,
                    hq: localSales.hqSaleVelocity
                }
            }, 
            cross: { 
                averagePrice: { ...crossAverages },
                averageSalesPerDay: crossAverageSalesPerDay,
                stackSizeHistogram: {
                    regular: crossSales.stackSizeHistogram,
                    nq: crossSales.stackSizeHistogramNQ,
                    hq: crossSales.stackSizeHistogramHQ
                },
                saleVelocity: {
                    regular: crossSales.regularSaleVelocity,
                    nq: crossSales.nqSaleVelocity,
                    hq: crossSales.hqSaleVelocity
                }
            } 
        })
    } catch(error) {
        res.status(502).json({ error })
    }
}