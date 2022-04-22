import {NavLink} from 'react-router-dom';
import {useCallback} from 'react';
import s from './Header.module.css';
import {useDispatch} from 'react-redux';
import {SuperSelect} from '../../common/super-components/c5-SuperSelect/SuperSelect';
import {saveState} from '../../utils/localstorage';
import {selectIsLoggedIn, selectTheme} from '../../store/selectors';
import {logout} from '../Auth/Login/LoginBLL/loginReducer';
import {PATH} from '../../enums/paths';
import {useAppSelector} from '../../store/store';
import {themeActions, ThemeType} from '../../store/themeReducer';

const themes = ['☀', '☽']

export const Header = () => {
    const theme = useAppSelector(selectTheme)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logout())
    }

    const onChangeCallback = useCallback((theme: ThemeType) => {
        dispatch(themeActions.changeTheme(theme))
        saveState(theme)
    }, [dispatch])

    return (
        <nav className={s.links}>
            <NavLink to={PATH.PROFILE}
                     className={({isActive}) => isActive ? s.active : s.nav}>
                Profile
            </NavLink>
            {
                isLoggedIn &&
                <>
                  <NavLink to={PATH.PACKS}
                           className={({isActive}) => isActive ? s.active : s.nav}>
                    Packs List
                  </NavLink>
                  <span onClick={logOut} className={s.nav}>
                    Log Out
                  </span>
                </>
            }
            {
                !isLoggedIn &&
                <>
                  <NavLink to={PATH.REGISTRATION}
                           className={({isActive}) => isActive ? s.active : s.nav}>
                    Registration
                  </NavLink>
                  <NavLink to={PATH.PASSWORD_RECOVERY}
                           className={({isActive}) => isActive ? s.active : s.nav}>
                    Password recovery
                  </NavLink>
                  <NavLink to={PATH.LOGIN}
                           className={({isActive}) => isActive ? s.active : s.nav}>
                    Log In
                  </NavLink>
                </>
            }
            <div className={s.select}>
                <span className={s.text}>Theme</span>
                <SuperSelect options={themes} value={theme}
                             onChangeOption={onChangeCallback}/>
            </div>
        </nav>
    )
}