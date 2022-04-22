import {selectIsLoggedIn} from '../store/selectors'
import {Navigate} from 'react-router-dom'
import {FC} from 'react'
import {PATH} from '../enums/paths';
import {useAppSelector} from '../store/store';

export const LoginNavigate: FC = ({children}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />
    return <>{children}</>
}
