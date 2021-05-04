import { CompletedChallenges } from '../components/CompletedChallenges';
import {ChallengesProvider} from '../contexts/ChallengesContext';
import { Countdown } from '../components/Countdown';
import {ExperienceBar} from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { Menu } from '../components/Menu';
import { CountdownProvider } from '../contexts/CountdownContext';
import Head from 'next/head';

import styles from '../styles/pages/Dashboard.module.css';
import { useSession } from 'next-auth/client';


export default function Home() {
  const [ session, loading ] = useSession();

  console.log(session);
  if(session) {
    return (
      <ChallengesProvider
      level={Number(session.user.level)}
      currentExperience = {Number(session.user.currentExperience)}
      challengesCompleted = {Number(session.user.challengesCompleted)}
      >
        <Menu />
      <div className={styles.container}>
        <Head>
          <title>Início | move-it</title>
        </Head>
        <ExperienceBar/>
        <CountdownProvider>
        <section id="home">
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
        </CountdownProvider>
      </div>
      </ChallengesProvider>
    )
  }
    return 'acesso negado';
}