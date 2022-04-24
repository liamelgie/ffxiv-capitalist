import useMarketBoardData from "./useMarketBoardData"

const MarketData = (props) => {
    const { id, world } = props
    const { marketBoardData, isLoading, isError } = useMarketBoardData(id, world)
    if (isError) return (
        <div>
            <h2>Market Data</h2>
            <div>Failed to load</div>
        </div>
    )
    if (isLoading) return (
        <div>
            <h2>Market Data</h2>
            <div>Loading...</div>
        </div>
    )
    return (
        <div>
            <h2>Market Data</h2>
            <h3>Lowest Price (local): { marketBoardData.local.listings[0] === undefined ? 'N/A' : marketBoardData.local.listings[0].pricePerUnit }</h3>
            <h3>Lowest Price (Cross-world: { marketBoardData.local.listings[0] === undefined ? 'N/A' : marketBoardData.cross.listings[0].worldName } ): { marketBoardData.local.listings[0] === undefined ? 'N/A' : marketBoardData.cross.listings[0].pricePerUnit } </h3>
        </div>
    )
}
export default MarketData