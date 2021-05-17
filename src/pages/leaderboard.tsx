import { Menu } from '../components/Menu';
import { useSession } from 'next-auth/client';
import styles from '../styles/pages/Leaderboard.module.css';
import { GetStaticProps } from 'next';
import { fauna } from "../services/fauna";
import { Collection, Documents, query as q } from 'faunadb';

interface User{
  name: string;
  email: string;
  image: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface LeaderboardProps {
  Users: User[];
}

export default function Leaderboard(props:LeaderboardProps) {
  const [ session, loading ] = useSession()

  if(session) {
    return (
      <>
        <Menu />
        <div className={styles.container}>
          <h1>Leaderboard</h1>
            <table className={styles.tableRank}>
                <thead>
                    <tr>
                        <th>POSIÇÃO</th>
                        <th>USUÁRIO</th>
                        <th>DESAFIOS</th>
                        <th>EXPERIÊNCIA</th>
                    </tr>
                </thead>

                <tbody>
                        <tr>
                            <td>1</td>
                            <td className={styles.Profile}>
                              <img src="https://github.com/HerbertSousa.png" alt="Foto"/>
                              <div>
                                  <strong>Herbert De Sousa</strong>
                                  <p>
                                      <img src="icons/level.svg" alt=""/>
                                      Level 2
                                  </p>
                              </div>   
                            </td>
                            <td><span>127</span> completados</td>
                            <td> <span>154000</span> xp</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td className={styles.Profile}>
                              <img src="https://github.com/HerbertSousa.png" alt="Foto"/>
                              <div>
                                  <strong>Herbert De Sousa</strong>
                                  <p>
                                      <img src="icons/level.svg" alt=""/>
                                      Level 2
                                  </p>
                              </div>   
                            </td>
                            <td><span>127</span> completados</td>
                            <td> <span>154000</span> xp</td>
                        </tr>
                </tbody>
            </table>
        </div>
      </>
    )
  }
    return 'acesso negado';
}


export const getStaticProps: GetStaticProps = async () => {
  const users = await fauna.query(
                    q.Map(
                      q.Paginate(Documents(Collection('users'))),
                      q.Lambda(x => q.Get(x))
                    )
                );
  console.log(users);

  return {
    props: {
    },
    revalidate: 60 * 60 * 2, // 24 hours
  };
}