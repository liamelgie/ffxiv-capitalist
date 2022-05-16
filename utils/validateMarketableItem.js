import Universalis from 'universalis.js'

const validateMarketableItem = async (id) => {
    const uni = new Universalis()
    const isValid = await uni.validateMarketableItem(id)
    return isValid
}

export default validateMarketableItem