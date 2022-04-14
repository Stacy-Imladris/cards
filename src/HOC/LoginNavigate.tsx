import {selectIsLoggedIn} from '../selectors/selectors'
import {Navigate} from 'react-router-dom'
import {PATH} from '../app/AllRoutes'
import {FC} from 'react'

export const LoginNavigate: FC = ({children}) => {
    if (!selectIsLoggedIn) {
        return <Navigate to={PATH.LOGIN} />
    }
    return <>{children}</>
}


