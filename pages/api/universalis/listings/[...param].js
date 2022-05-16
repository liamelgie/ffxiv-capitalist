import findDataCenter from '../../../../utils/findDataCenter';
import Universalis from 'universalis.js';

export default async function handler(req, res) {
    const { param } = req.query
    if (!param[0] || !param[1]) return res.status(404)
    const uni = new Universalis()
    const dataCenter = await findDataCenter(param[0])
    try {
        const data = await uni.getListings(dataCenter, param[1])
        const sortedListings = uni.sortListingsByWorld(await data.listings)
        const capitalisedLocalWorldName = `${param[0][0].toUpperCase()}${param[0].slice(1)}`
        const local = {
            worldName: capitalisedLocalWorldName,
            cheapest: sortedListings[capitalisedLocalWorldName][0].pricePerUnit,
            listings: sortedListings[capitalisedLocalWorldName]
        }
        const cross = {
            dcName: data.dcName,
            cheapest: data.listings[0].pricePerUnit,
            listings: data.listings
        }
        return res.status(200).json({ sorted: sortedListings, local, cross })
    } catch(error) {
        res.status(502).json({ error })
    }
  }  