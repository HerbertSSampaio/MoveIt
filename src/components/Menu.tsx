import styles from '../styles/components/Menu.module.css'
import { FiHome, FiAward, FiLogOut } from "react-icons/fi";
import { session, signout } from 'next-auth/client';
import Router from 'next/router'
import { useCallback } from 'react';

export function Menu() {
    const logout = useCallback(() => {
        signout();
        Router.push('/');
    }, []);

    return (
        <div className={styles.menu}>
            <img src="logomenu.svg" alt="logo"/>
            <nav>
                <a href="#" className={styles.ativo}><FiHome size={35} /></a>
                <a href="#"><FiAward size={35} /></a>
            </nav>
            <button onClick={() => logout()}><FiLogOut size={35} /></button>
        </div>
    );
}