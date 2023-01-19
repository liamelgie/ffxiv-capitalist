import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
const TimeUntilRefreshIndicator = ({ refreshInterval }) => {
    const [counter, setCounter] = useState(refreshInterval)

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter -1), 1000)
        counter === 0 && setCounter(refreshInterval)
        // TODO: Add onCountdownFinish logic to manually refresh the data via callback
    }, [counter])

    return <div className={styles.timeUntilRefreshIndicator}>Refreshing results in {counter}</div>
}

export default TimeUntilRefreshIndicator