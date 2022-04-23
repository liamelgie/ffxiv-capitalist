const fs = require('fs');
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI({private_key: process.env.XIVAPI_KEY})

export default async function handler(req, res) {
    const { id } = req.query
    if (!id) return res.status(404)
    await xiv.data.get('item', id).then(item => {
        res.status(200).json({ item })
    })
  }  