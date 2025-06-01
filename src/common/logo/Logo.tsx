import styles from './Logo.module.css';
import logo from 'assets/images/logo.png'
import t from 'common/styles/Themes.module.css';
import {selectTheme} from 'store/selectors';
import {useAppSelector} from 'store/store';

export const Logo = () => {
    const theme = useAppSelector(selectTheme)

    return <>
        <img alt={'logo'} src={logo} className={styles.logo}/>
        <h2 className={`${styles.brand} ${t[theme + '-text']}`}>BRAINSTORM</h2>
    </>
}