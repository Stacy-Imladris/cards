import {NavLink} from 'react-router-dom';
import {useCallback} from 'react';
import s from './Header.module.css';
import {PATH} from '../../app/AllRoutes';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../bll/store';
import {themeActions, ThemeType} from '../../bll/themeReducer';
import {SuperSelect} from '../../common/super-components/c5-SuperSelect/SuperSelect';
import {saveState} from '../../utils/localstorage';
import {selectIsLoggedIn, selectTheme, selectUser_id} from '../../selectors/selectors';
import {logout} from '../Login/LoginBLL/loginReducer';
import {packsActions} from "../Packs/packs-reducer";
import {profileActions} from "../Profile/profile-reducer";
import {UserType} from "../Profile/profile-api";

const themes = ['day', 'night']

export const Header = () => {
    const theme = useAppSelector(selectTheme)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const user_id = useAppSelector(selectUser_id)
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logout())
    }

    const onChangeCallback = useCallback((theme: ThemeType) => {
        dispatch(themeActions.changeTheme(theme))
        saveState(theme)
    }, [dispatch])

    const onClickToProfile = () => {
        dispatch(packsActions.setPacksForUser(user_id))
    }

    const onClickToPacksList = () => {
        dispatch(packsActions.setPacksForUser(''))
    }

    return (
        <nav className={s.main}>
            <div className={s.links}>
                <NavLink to={PATH.PROFILE} onClick={onClickToProfile}
                         className={({isActive}) => isActive ? s.active : s.nav}>Profile</NavLink>
                {isLoggedIn && <NavLink to={PATH.PACKS} onClick={onClickToPacksList}
                                         className={({isActive}) => isActive ? s.active : s.nav}>Packs List</NavLink>}
                {!isLoggedIn && <NavLink to={PATH.REGISTRATION}
                                         className={({isActive}) => isActive ? s.active : s.nav}>Registration</NavLink>}
                {!isLoggedIn && <NavLink to={PATH.PASSWORD_RECOVERY}
                         className={({isActive}) => isActive ? s.active : s.nav}>Password recovery</NavLink>}
                {!isLoggedIn && <NavLink to={PATH.LOGIN}
                                         className={({isActive}) => isActive ? s.active : s.nav}>Log In</NavLink>}
                {isLoggedIn && <span onClick={logOut} className={isLoggedIn  ? s.nav: s.active}>Log Out</span>}
                <span className={s.text}>Theme</span>
                <SuperSelect options={themes} value={theme} onChangeOption={onChangeCallback}/>
            </div>
            <div className={s.menu}>Menu</div>
        </nav>
    )
}