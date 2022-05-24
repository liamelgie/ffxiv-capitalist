import Link from "next/link"
import styles from '../styles/Header.module.css'
import SearchBar from "./SearchBar"

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSideCont}>
                <div className={styles.logo}>
                    <h1>Rowena</h1>
                </div>
                <SearchBar />
            </div>
        </header>
    )
}
export default Header