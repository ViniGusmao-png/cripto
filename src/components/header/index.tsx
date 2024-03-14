import { Link } from 'react-router-dom'
// deixando o meu CSS apenas pra essa pagina, fazendo um escopo do css
import styles from './header.module.css'

import logo from '../../assets/logo.svg'

export function Header(){
    return(
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                <img src={logo} alt="Logo cripto" />
                </Link>
            </div>
        </header>
    )
}