const fs = require('fs');
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI({private_key: process.env.XIVAPI_KEY})
const url = 'http://localhost:3000'

export default async function handler(req, res) {
    const { string, index='item' } = req.query
    if (!string) return res.status(404)
    await xiv.search(string, { indexes: index }).then(async (results) => {
        const validIDs = await fetch(`${url}/api/universalis/marketableItems`).then(res => res.json())
        const validatedIndexes = await Promise.all(results.Results.map(async (result) => {
            return validIDs.includes(result.ID)
        }))
        const validatedResults = results.Results.filter((value, index) => validatedIndexes[index])
        return validatedResults
    }).then(validatedResults => {
        res.status(200).json({ results: validatedResults })
    })
  }  