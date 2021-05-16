import styles from '../styles/components/Menu.module.css'
import { FiHome, FiAward, FiLogOut } from "react-icons/fi";
import { session, signout } from 'next-auth/client';
import Router from 'next/router'
import { ActiveLink } from './ActiveLink';
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
                <ActiveLink activeClassName={styles.ativo} href="/dashboard">
                    <a><FiHome size={35} /></a>
                </ActiveLink>
                <ActiveLink activeClassName={styles.ativo} href="/leaderboard" prefetch>
                    <a><FiAward size={35} /></a>
                </ActiveLink>
            </nav>
            <button onClick={() => logout()}><FiLogOut size={35} /></button>
        </div>
    );
}