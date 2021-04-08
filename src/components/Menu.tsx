import styles from '../styles/components/Menu.module.css'
import { FiHome, FiAward } from "react-icons/fi";

export function Menu() {
    return (
        <div className={styles.menu}>
            <img src="logomenu.svg" alt="logo"/>
            <nav>
                <a href="#" className={styles.ativo}><FiHome size={35} /></a>
                <a href="#"><FiAward size={35} /></a>
            </nav>
        </div>
    );
}