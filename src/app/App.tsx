import React, {useEffect} from 'react'
import './App.css';
import {Header} from '../components/Header/Header';
import {useAppSelector} from '../bll/store';
import t from '../common/styles/Themes.module.css'
import s from './App.module.css'
import {AllRoutes, PATH} from './AllRoutes'
import {Navigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {auth} from '../bll/profileReducer'

export const App = () => {
    const theme = useAppSelector(state => state.theme.theme)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    if(!isLoggedIn) {
        <Navigate to={PATH.LOGIN} />
    }

    return (
        <div className={`${s.main} ${t[theme]}`}>
            <Header/>
            <AllRoutes/>
        </div>
    )
}