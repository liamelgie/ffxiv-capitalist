import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from '../../components/Header'
import ItemInfo from '../../components/ItemInfo'
import QuickLook from '../../components/QuickLook'
import ListingTable from '../../components/ListingTable'
import SalesTable from '../../components/SalesTable'
import styles from '../../styles/ItemPage.module.css'

const Item = () => {
  const router = useRouter()
  const { id } = router.query
  const [ worldName, setWorldName ] = useState('cerberus')
  const [ isHQOnly, setIsHQOnly ] = useState(true)

  return (
      <div>
        <Header />
        <div className={styles.content}>
          <div className={styles.topLevel}>
            <ItemInfo id={id} />
            <QuickLook id={id} world={worldName} hq={isHQOnly}/>
          </div>
          <div className={styles.detailContainer}>
            HQ only: <button onClick={() => setIsHQOnly(!isHQOnly)}>{ isHQOnly ? 'On' : 'Off'}</button>
            <div className={styles.detailSubGroup}>
              <h2 className={styles.detailSubGroupHeading}>Current Listings</h2>
              <div>
                <h3>{`${worldName[0].toUpperCase()}${worldName.slice(1)}`}</h3>
                <ListingTable crossWorld={false} id={id} world={worldName} limit={15} hq={isHQOnly} setIsHQOnly={setIsHQOnly}/>
              </div>
              <div>
                <h3>Cross World</h3>
                <ListingTable crossWorld={true} id={id} world={worldName} limit={15} hq={isHQOnly} />
              </div>
            </div>
            <div className={styles.detailSubGroup}>
            <h2 className={styles.detailSubGroupHeading}>Sales History</h2>
              <div>
                <h3>{`${worldName[0].toUpperCase()}${worldName.slice(1)}`}</h3>
                <SalesTable crossWorld={false} id={id} world={worldName} limit={15} hq={isHQOnly} />
              </div>
              <div>
                <h3>Cross World</h3>
                <SalesTable crossWorld={true} id={id} world={worldName} limit={15} hq={isHQOnly} />
              </div>
            </div>
          </div>
        </div>
     </div>
    )
  }
  
  export default Item
  