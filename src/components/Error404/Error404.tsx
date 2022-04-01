import React from 'react'
import s from './Error404.module.css'
import t from '../../common/styles/Themes.module.css'
import {NavLink} from 'react-router-dom';
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton';
import {useAppSelector} from '../../bll/store';
import {PATH} from '../../app/AllRoutes';

export const Error404 = () => {
    const theme = useAppSelector(state => state.theme.theme)

    return (
        <div className={`${s.container} ${t[theme]} ${t[theme + '-text']}`}>
            <div className={`${s.error} ${t[theme + '-text']}`}>404</div>
            <div className={`${s.text} ${t[theme + '-text']}`}>Page not found!</div>
            <div className={`${s.textNav} ${t[theme + '-text']}`}>Maybe, you want to see your <NavLink to={PATH.PROFILE} className={s.nav}>Profile</NavLink> page?</div>
            <div className={t[theme + '-text']}>In case you decide to leave this awesome application, press button:
                <div className={s.joke}><SuperButton>Leave</SuperButton></div>
            </div>
        </div>
    )
}