const findDataCenter = async (world) => {
    // Determine data center based on the provided world
    const XIVAPI = require('@xivapi/js')
    const xiv = new XIVAPI({private_key: process.env.XIVAPI_KEY})
    const dataCenters = await xiv.data.datacenters()
    let dataCenter = ""
    for (let [key, value] of Object.entries(dataCenters)) {
        if (value.includes(`${world.charAt(0).toUpperCase() + world.slice(1)}`)) {
            dataCenter = key
            break
        }
    }
    return dataCenter
}

export default findDataCenter