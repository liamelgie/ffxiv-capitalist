import Head from "next/head"
import Image from "next/image"
import useInsights from "../hooks/useInsights"
import GilIcon from "./GilIcon"
import styles from "../styles/Insights.module.css"
import dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Insights = ({ id, world }) => {
    const { insights, isLoading, isError } = useInsights(id, world)
    if (isError) return (
        <div>
            <div>Failed to load</div>
        </div>
    )
    if (isLoading) return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}>
                <Image className={styles.loading} src={"/loading.gif"} height={10} width={30} alt="loading"/>
            </div>
        </div>
    )
    return (
        <div className={styles.insightsContainer}>
            <div className={styles.worldContainer}>
                <h2>{insights.local.worldName}</h2>
                <div className={styles.datapoints}>
                    <h3 className={styles.datapointHeading}>Average Price (HQ)</h3>
                    <div className={styles.datapointValue}>
                        {Number(insights.local.averagePrice.hq).toLocaleString('en-US')}
                        <GilIcon height={17} width={17}/>
                    </div>
                </div>
                <div className={styles.datapoints}>
                    <h3 className={styles.datapointHeading}>Average Price (NQ)</h3>
                    <div className={styles.datapointValue}>
                        {Number(insights.local.averagePrice.nq).toLocaleString('en-US')}
                        <GilIcon height={17} width={17}/>
                    </div>
                </div>
                <div className={styles.datapoints}>
                    <h3 className={styles.datapointHeading}>Average Sales per Day</h3>
                    <div className={styles.datapointValue}>
                        {insights.local.averageSalesPerDay}
                    </div>
                </div>
                <div className={styles.datapoints}>
                    <h3 className={styles.datapointHeading}>Cheapest Price {insights.local.cheapest.hq > 0 ? "(HQ)" : "(NQ)"}</h3>
                    <div className={styles.datapointValue}>
                        {Number(insights.local.cheapest.hq.price > 0 
                            ? insights.local.cheapest.hq.price 
                            : insights.local.cheapest.nq.price).toLocaleString('en-US')}
                        <GilIcon height={17} width={17}/>
                    </div> 
                </div>
            </div>
            <div className={styles.worldContainer}>
                <h2>Cross World ({insights.cross.dataCenterName})</h2>
                <div className={styles.datapoints}>
                    <h3 className={styles.datapointHeading}>Average Price (HQ)</h3>
                    <div className={styles.datapointValue}>
                        {Number(insights.cross.averagePrice.hq).toLocaleString('en-US')}
                        <GilIcon height={17} width={17}/>
                    </div>
                </div>
                <div className={styles.datapoints}>
                    <h3 className={styles.datapointHeading}>Average Price (NQ)</h3>
                    <div className={styles.datapointValue}>
                        {Number(insights.cross.averagePrice.nq).toLocaleString('en-US')}
                        <GilIcon height={17} width={17}/>
                    </div>
                </div>
                <div className={styles.datapoints}>
                    <h3 className={styles.datapointHeading}>Cheapest Price {insights.cross.cheapest.hq > 0 ? "(HQ)" : "(NQ)"}</h3>
                    <div className={styles.datapointValue}>
                        <b>
                            {insights.cross.cheapest.hq.price > 0 
                            ? insights.cross.cheapest.hq.worldName
                            : insights.cross.cheapest.nq.worldName}
                        </b>
                    </div>
                    <div className={styles.datapointValue}>
                        {Number(insights.cross.cheapest.hq.price > 0 
                            ? insights.cross.cheapest.hq.price 
                            : insights.cross.cheapest.nq.price).toLocaleString('en-US')}
                        <GilIcon height={17} width={17}/>
                    </div> 
                </div>
                <div className={styles.datapoints}>
                    <h3 className={styles.datapointHeading}>Potential Profit</h3>
                    <div className={styles.datapointValue}>
                        {insights.local.cheapest.nq.price > 0 ? 
                            Number(
                                (insights.local.cheapest.hq.price > 0 
                                    ? insights.local.cheapest.hq.price 
                                    : insights.local.cheapest.nq.price) 
                                - 
                                (insights.cross.cheapest.hq.price > 0 
                                    ? insights.cross.cheapest.hq.price 
                                    : insights.cross.cheapest.nq.price)
                            ).toLocaleString('en-US') 
                        : Number(
                            (insights.cross.cheapest.hq.price > 0 
                                ? insights.cross.cheapest.hq.price 
                                : insights.cross.cheapest.nq.price)
                            -
                            (insights.local.cheapest.hq.price > 0 
                                ? insights.local.cheapest.hq.price 
                                : insights.local.cheapest.nq.price) 
                        ).toLocaleString('en-US')  }
                        <GilIcon height={17} width={17}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Insights