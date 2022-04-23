import findDataCenter from '../../../../utils/findDataCenter';
const fs = require('fs');

export default async function handler(req, res) {
    const { param } = req.query
    if (!param[0] || !param[1]) return res.status(404)
    const dataCenter = await findDataCenter(param[0])
    Promise.all([
        fetch(`https://universalis.app/api/${param[0]}/${param[1]}`).then(res => res.json()),
        fetch(`https://universalis.app/api/${dataCenter}/${param[1]}`).then(res => res.json())
    ]).then(listings => {
        res.status(200).json({ local: listings[0], cross: listings[1]})
    })
  }  