import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../components/Login/Login';
import {Registration} from '../components/Registration/Registration';
import {NewPassword} from '../components/PasswordPages/NewPassword';
import {Error404} from '../components/Error404/Error404';
import {Test} from '../components/Test/Test';
import {PasswordRecovery} from '../components/PasswordPages/PasswordRecovery';
import {Profile} from '../components/Profile/Profile';
import {Header} from '../components/Header/Header';
import {useAppSelector} from '../bll/store';
import t from '../common/styles/Themes.module.css'
import s from './App.module.css'

export enum PATH {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    ERROR_404 = '/error-404',
    PASSWORD_RECOVERY = '/password-recovery',
    NEW_PASSWORD = '/new-password',
    TEST = '/test',
}

function App() {
    const theme = useAppSelector(state => state.theme.theme)

    return (
        <div className={`${s.main} ${t[theme]}`}>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to={PATH.PROFILE}/>}/>

                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>

                <Route path={PATH.ERROR_404} element={<Error404/>}/>
                <Route path="*" element={<Navigate to={PATH.ERROR_404}/>}/>
            </Routes>
        </div>
    )
}

export default App;