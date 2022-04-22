import s from './Logo.module.css';
import logo from '../../assets/images/logo.png'
import t from '../styles/Themes.module.css';
import {selectTheme} from '../../store/selectors';
import {useAppSelector} from '../../store/store';

export const Logo = () => {
    const theme = useAppSelector(selectTheme)

    return <>
        <img alt={'logo'} src={logo} className={s.logo}/>
        <h2 className={`${s.brand} ${t[theme + '-text']}`}>BRAINSTORM</h2>
    </>
}