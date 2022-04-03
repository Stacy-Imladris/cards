import {NavLink} from 'react-router-dom';
import React from 'react';
import s from './Header.module.css';
import {PATH} from '../../app/AllRoutes';

export const Header = () => {
    return (
        <nav className={s.main}>
            <div className={s.links}>
                <NavLink to={PATH.PROFILE}
                         className={({isActive}) => isActive ? s.active : s.nav}>Profile</NavLink>
                <NavLink to={PATH.TEST}
                         className={({isActive}) => isActive ? s.active : s.nav}>Test</NavLink>
                <NavLink to={PATH.ERROR_404}
                         className={({isActive}) => isActive ? s.active : s.nav}>Error 404</NavLink>
                <NavLink to={PATH.LOGIN}
                         className={({isActive}) => isActive ? s.active : s.nav}>Log In</NavLink>
                <NavLink to={PATH.REGISTRATION}
                         className={({isActive}) => isActive ? s.active : s.nav}>Registration</NavLink>
                <NavLink to={PATH.PASSWORD_RECOVERY}
                         className={({isActive}) => isActive ? s.active : s.nav}>Password recovery</NavLink>
                <NavLink to={PATH.NEW_PASSWORD}
                         className={({isActive}) => isActive ? s.active : s.nav}>New password</NavLink>
            </div>
            <div className={s.menu}>Menu</div>
        </nav>
    )
}