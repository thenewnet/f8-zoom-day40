
import { Link, useLocation } from 'react-router';
import styles from './Header.module.scss'

import f8Logo from '@/assets/f8-logo.png';

function Header(){
    const location = useLocation();
    const navItems = [
        {
            label: 'Trang chủ',
            to: '/'
        },
        {
            label: 'Tasks',
            to: '/tasks'
        }
    ]
    return (
        <header className={styles.container}>
            <div className={styles.logoWrapper}>
                <img src={f8Logo} alt="F8" className={styles.logo}/>
            </div>
            <div className={styles.menu}>
                <ul>
                    {
                        navItems.map((item, index) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <li key={index}>
                                    <Link to={item.to} className={isActive ? styles.active : ''}>{item.label}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </header>
    )
}

export default Header;