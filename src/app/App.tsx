import React, {useEffect} from 'react'
import './App.css'
import {Header} from '../components/Header/Header'
import {useAppSelector} from '../bll/store'
import t from '../common/styles/Themes.module.css'
import s from './App.module.css'
import {AllRoutes, PATH} from './AllRoutes'
import {Navigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {auth} from '../bll/profile-reducer'
import {Preloader} from '../common/preloader/Preloader';

export const App = () => {
    const theme = useAppSelector(state => state.theme.theme)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const isInitialized = useAppSelector(state => state.profile.isInitialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    if (!isInitialized) {
        return <div className={s.appProgress}><Preloader/></div>
    }

    return (
        <div className={`${s.main} ${t[theme]}`}>
            <Header/>
            <AllRoutes/>
        </div>
    )
}