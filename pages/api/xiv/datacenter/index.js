const fs = require('fs');
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI({private_key: process.env.XIVAPI_KEY})

export default async function handler(req, res) {
    await xiv.data.datacenters().then(datacenters => {
        res.status(200).json({ ...datacenters })
    })
  }  