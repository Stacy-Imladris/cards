import {NavLink} from 'react-router-dom';
import React from 'react';
import {PATH} from '../../App';
import s from './Header.module.css';

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
            </div>
            <div className={s.menu}>Menu</div>
        </nav>
    )
}