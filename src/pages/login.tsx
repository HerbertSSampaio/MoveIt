import styles from '../styles/pages/Login.module.css';
import { FiArrowRight } from "react-icons/fi";

export default function Login() {
    return (
        <div className={styles.container}>
            <section>
                <img src="logo.svg" alt="Logo"/>
                <h1>Bem-vindo</h1>
                <div>
                    <img src="github.svg" alt="Logo"/>
                    <p>Faça login com seu Github <br/> para começar</p>
                </div>
                <div>
                    <input type="text" placeholder="Digite seu username" size={30}/>
                    <button>
                        <FiArrowRight size={30}/>
                    </button>
                </div>
            </section>
        </div>
    );
}