import {selectIsLoggedIn} from '../selectors/selectors'
import {Navigate} from 'react-router-dom'
import {PATH} from '../app/AllRoutes'
import {FC} from 'react'
import {useAppSelector} from '../bll/store'

export const LoginNavigate: FC = ({children}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />
    return <>{children}</>
}
