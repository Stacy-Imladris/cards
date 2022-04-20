import {selectIsLoggedIn} from '../selectors/selectors'
import {Navigate} from 'react-router-dom'
import {FC} from 'react'
import {useAppSelector} from '../bll/store'
import {PATH} from '../enums/paths';

export const LoginNavigate: FC = ({children}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />
    return <>{children}</>
}
