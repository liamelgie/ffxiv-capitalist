import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../../components/Header'
import ItemInfo from '../../components/ItemInfo'
import ListingTable from '../../components/ListingTable'
import SalesTable from '../../components/SalesTable'
import styles from '../../styles/ItemPage.module.css'
import Insights from '../../components/Insights'

const Item = () => {
  const router = useRouter()
  const { id } = router.query
  const [ worldName, setWorldName ] = useState('Cerberus')
  const [ isHQOnlyFilter, setIsHQOnlyFilter ] = useState(true)
  return (
      <div>
        <Header />
        <div className={styles.content}>
          <div className={styles.topLevel}>
            <ItemInfo id={id} world={worldName} />
            <Insights id={id} world={worldName} />
          </div>
          <div className={styles.detailContainer}>
            <button onClick={() => setIsHQOnlyFilter(!isHQOnlyFilter)}>{ isHQOnlyFilter ? 'HQ Only' : 'HQ and NQ'}</button>
            <div className={styles.detailSubGroup}>
              <h2 className={styles.detailSubGroupHeading}>Current Listings</h2>
              <div>
                <h3>{`${worldName[0].toUpperCase()}${worldName.slice(1)}`}</h3>
                <ListingTable crossWorld={false} id={id} world={worldName} limit={15} hq={isHQOnlyFilter} setIsHQOnlyFilter={setIsHQOnlyFilter}/>
              </div>
              <div>
                <h3>Cross World</h3>
                <ListingTable crossWorld={true} id={id} world={worldName} limit={15} hq={isHQOnlyFilter} setIsHQOnlyFilter={setIsHQOnlyFilter}/>
              </div>
            </div>
            <div className={styles.detailSubGroup}>
            <h2 className={styles.detailSubGroupHeading}>Sales History</h2>
              <div>
                <h3>{`${worldName[0].toUpperCase()}${worldName.slice(1)}`}</h3>
                <SalesTable crossWorld={false} id={id} world={worldName} limit={15} hq={isHQOnlyFilter} />
              </div>
              <div>
                <h3>Cross World</h3>
                <SalesTable crossWorld={true} id={id} world={worldName} limit={15} hq={isHQOnlyFilter} />
              </div>
            </div>
          </div>
        </div>
     </div>
    )
  }
  
  export default Item
  