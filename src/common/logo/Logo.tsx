import styles from './Logo.module.css';
import logo from 'assets/images/logo.png'
import extraStyles from 'common/styles/Themes.module.css';
import {selectTheme} from 'store/selectors';
import {useAppSelector} from 'store/store';

export const Logo = () => {
  const theme = useAppSelector(selectTheme)

  return (
      <>
        <img alt={'logo'} src={logo} className={styles.logo}/>
        <h2 className={`${styles.brand} ${extraStyles[theme + '-text']}`}>BRAINSTORM</h2>
      </>
  )
}