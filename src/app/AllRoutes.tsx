import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../components/Login/LoginUI/Login';
import {Profile} from '../components/Profile/Profile';
import {Test} from '../components/Test/Test';
import {Error404} from '../components/Error404/Error404';
import {RegistrationContainer} from '../components/Registration/RegistrationUI/RegistrationContainer';
import {RecoveryContainer} from '../components/Recovery/RecoveryUI/RecoveryContainer';
import {NewPasswordContainer} from '../components/NewPassword/NewPasswordUI/NewPasswordContainer';
import {Table} from '../common/Table/Table';

export enum PATH {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    ERROR_404 = '/error-404',
    PASSWORD_RECOVERY = '/password-recovery',
    NEW_PASSWORD = '/new-password/:resetPasswordToken',
    TEST = '/test',
    PACKS = '/packs',
}

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={PATH.PROFILE}/>}/>

            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<RegistrationContainer/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.PASSWORD_RECOVERY} element={<RecoveryContainer/>}/>
            <Route path={PATH.NEW_PASSWORD} element={<NewPasswordContainer/>}/>
            <Route path={PATH.TEST} element={<Test/>}/>
            <Route path={PATH.PACKS} element={<Table/>}/>

            <Route path={PATH.ERROR_404} element={<Error404/>}/>
            <Route path="*" element={<Navigate to={PATH.ERROR_404}/>}/>
        </Routes>
    )
}