import findDataCenter from '../../../../utils/findDataCenter';

const fs = require('fs');
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI({private_key: process.env.XIVAPI_KEY})

export default async function handler(req, res) {
    const { world } = req.query
    const dc = await findDataCenter(world)
    const dcs = await xiv.data.datacenters()
    res.status(200).json({ [dc]: Object.values(dcs[dc]) })
  }  