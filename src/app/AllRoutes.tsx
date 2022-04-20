import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from '../components/Auth/Login/LoginUI/Login'
import {Profile} from '../components/Profile/ProfileUI/Profile'
import {Error404} from '../components/Error404/Error404'
import {RegistrationContainer} from '../components/Auth/Registration/RegistrationUI/RegistrationContainer'
import {RecoveryContainer} from '../components/Auth/Recovery/RecoveryUI/RecoveryContainer'
import {NewPasswordContainer} from '../components/Auth/NewPassword/NewPasswordUI/NewPasswordContainer'
import {Packs} from '../components/Packs/PacksUI/Packs'
import {Cards} from '../components/Cards/CardsUI/Cards';
import {LoginNavigate} from '../hoc/LoginNavigate'
import {PATH} from '../enums/paths';

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={PATH.PROFILE}/>}/>
            <Route path={PATH.PROFILE} element={<LoginNavigate><Profile/></LoginNavigate>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<RegistrationContainer/>}/>
            <Route path={PATH.PASSWORD_RECOVERY} element={<RecoveryContainer/>}/>
            <Route path={PATH.NEW_PASSWORD} element={<NewPasswordContainer/>}/>
            <Route path={PATH.PACKS} element={<LoginNavigate><Packs/></LoginNavigate>}/>
            <Route path={`${PATH.CARDS}/:packUserId`} element={<LoginNavigate><Cards/></LoginNavigate>}/>
            <Route path={PATH.ERROR_404} element={<Error404/>}/>
            <Route path="*" element={<Navigate to={PATH.ERROR_404}/>}/>
        </Routes>
    )
}