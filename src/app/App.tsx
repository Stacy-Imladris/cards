import {useEffect} from 'react'
import {Header} from '../components/Header/Header'
import {useAppSelector} from '../bll/store'
import t from '../common/styles/Themes.module.css'
import s from './App.module.css'
import {AllRoutes} from './AllRoutes'
import {useDispatch} from 'react-redux'
import {auth} from '../bll/profile-reducer'
import {Preloader} from '../common/preloader/Preloader';
import {selectIsInitialized, selectTheme} from '../selectors/selectors';

export const App = () => {
    const theme = useAppSelector(selectTheme)
    const isInitialized = useAppSelector(selectIsInitialized)

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