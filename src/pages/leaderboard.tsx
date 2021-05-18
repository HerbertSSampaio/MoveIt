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

type UserFauna = {
  ref: string;
  ts: number;
  data: User;
}

type UserProps = {
  data: UserFauna[];
}

interface LeaderboardProps {
  rankUsers: User[];
}

export default function Leaderboard({ rankUsers }:LeaderboardProps) {
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
                      { rankUsers.map((post, indice) => (
                        <tr key={post.email}>
                          <td>{indice + 1}</td>
                          <td className={styles.Profile}>
                            <img src={post.image} alt="Foto"/>
                            <div>
                                <strong>{post.name}</strong>
                                <p>
                                    <img src="icons/level.svg" alt=""/>
                                    Level {post.level}
                                </p>
                            </div>   
                          </td>
                          <td><span>{post.challengesCompleted}</span> completados</td>
                          <td><span>{post.currentExperience}</span> xp</td>
                        </tr>
                      ))}
                </tbody>
            </table>
        </div>
      </>
    )
  }
    return 'acesso negado';
}


export const getStaticProps: GetStaticProps = async () => {
  const faunaUsers = await fauna.query<UserProps>(
    q.Map(
        q.Paginate(Documents(Collection('users'))),
        q.Lambda(x => q.Get(x))
    )
  );

  const users = faunaUsers.data.map(user => {
    return user.data;
  });

  const rankUsers = users.sort((firstUser, secondUser) => {
    if( firstUser.level < secondUser.level ) {
      return 1;
    }
    else if( firstUser.level === secondUser.level ) {
      if ( firstUser.currentExperience < secondUser.currentExperience ) {
        return 1;
      }
      return -1;
    }
    return -1;
  });

  return {
    props: {rankUsers},
    revalidate: 60 * 60 * 2, // 24 hours
  };
}