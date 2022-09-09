import Universalis from 'universalis.js'
const fs = require('fs')
const filePath = "./public/marketable.json"

export default async function handler(req, res) {
    const uni = new Universalis()
    try {
        let ids = []
        if (!fs.existsSync(filePath)) {
            ids = await uni.getMarketableItems()
            fs.writeFileSync(filePath, JSON.stringify({ids: ids, timestamp: Date.now()}))
            return res.status(200).json(ids)
        }
        const raw = fs.readFileSync(filePath)
        const data = JSON.parse(raw)
        if (Math.floor((data.timestamp - Date.now()) / (1000*60*60*24)) > 1) {
            ids = await uni.getMarketableItems()
            fs.writeFileSync(filePath, JSON.stringify({ids: ids, timestamp: Date.now()}, null, 2))
        }
        return res.status(200).json(data.ids)
    } catch(error) {
        res.status(502).json({ error })
    }
  }  