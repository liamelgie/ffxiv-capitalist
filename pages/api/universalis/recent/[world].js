import findDataCenter from '../../../../utils/findDataCenter';
import Universalis from 'universalis.js';

export default async function handler(req, res) {
    const { world } = req.query
    if (!world) return res.status(404)
    const uni = new Universalis()
    try {
        const recentlyUpdatedItems = await uni.getMostRecentlyUpdatedItems(world)
        return res.status(200).json(recentlyUpdatedItems)
    } catch(error) {
        res.status(502).json({ error })
    }
  }  