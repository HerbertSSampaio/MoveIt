import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { useSession } from 'next-auth/client';

export function Profile() {
    const {level} = useContext(ChallengesContext);
    const [ session, loading ] = useSession();

    return(
        <div className={styles.profileContainer}>
            <img src={session.user.image} alt="Herbert"/>
            <div>
                <strong>{session.user}</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}