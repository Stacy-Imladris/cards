import React from 'react';
import './App.css';
import {Header} from '../components/Header/Header';
import {useAppSelector} from '../bll/store';
import t from '../common/styles/Themes.module.css'
import s from './App.module.css'
import {AllRoutes} from './AllRoutes';

export const App = () => {
    const theme = useAppSelector(state => state.theme.theme)

    return (
        <div className={`${s.main} ${t[theme]}`}>
            <Header/>
            <AllRoutes/>
        </div>
    )
}