import Universalis from 'universalis.js';

export default async function handler(req, res) {
    const uni = new Universalis()
    try {
        const recentlyUpdatedItems = await uni.getRecentlyUpdatedItemsLegacy()
        return res.status(200).json(recentlyUpdatedItems)
    } catch(error) {
        res.status(502).json({ error })
    }
  }  