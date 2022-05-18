const fs = require('fs');
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI({private_key: process.env.XIVAPI_KEY})

export default async function handler(req, res) {
    const { string } = req.query
    if (!string) return res.status(404)
    await xiv.search(string).then(results => {
        res.status(200).json({ results })
    })
  }  