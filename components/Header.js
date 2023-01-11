import Link from "next/link"
import styles from '../styles/Header.module.css'
import SearchBar from "./SearchBar"

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSideCont}>
                <div className={styles.logo}>
                    <Link href="/"><h1 style={{cursor: "pointer"}}>R</h1></Link>
                </div>
                {props.search && <SearchBar />}
            </div>
        </header>
    )
}
export default Header