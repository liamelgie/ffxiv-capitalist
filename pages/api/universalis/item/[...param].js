import findDataCenter from '../../../../utils/findDataCenter';
import Universalis from 'universalis.js';

export default async function handler(req, res) {
    const { param } = req.query
    if (!param[0] || !param[1]) return res.status(404)
    const uni = new Universalis()
    const dataCenter = await findDataCenter(param[0])
    Promise.all([
        uni.getListings(param[0], param[1]),
        uni.getListings(dataCenter, param[1])
    ]).then(listings => {
        res.status(200).json({ local: listings[0], cross: listings[1]})
    })
    .catch(error => {
        res.status(502).json({ error })
    })
  }  