import styles from '../styles/pages/Login.module.css';
import { FiArrowRight } from "react-icons/fi";
import { signIn, signOut, useSession } from 'next-auth/client';


export default function Login() {
    return (
        <div className={styles.container}>
            <section>
                <img src="logo.svg" alt="Logo"/>
                <h1>Bem-vindo</h1>
                <div>
                    <p>Faça login com seu Github <br/> para começar</p>
                </div>
                <div>
                    <button onClick={(): Promise<void> => signIn('github')}>
                        <img src="github.svg" alt="Logo"/>
                        Sign In
                        <FiArrowRight size={30}/>
                    </button>
                </div>
            </section>
        </div>
    );
}