import styles from '../styles/pages/Login.module.css';
import { FiArrowRight } from "react-icons/fi";
import { signIn, useSession } from 'next-auth/client';
import Router from 'next/router'

export default function Login() {
    const [ session, loading ] = useSession()

    if(session) {
        Router.push("/dashboard");
    }
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