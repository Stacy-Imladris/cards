import {useEffect} from 'react'
import {Header} from '../components/Header/Header'
import t from '../common/styles/Themes.module.css'
import s from './App.module.css'
import {AllRoutes} from './AllRoutes'
import {useDispatch} from 'react-redux'
import {auth} from '../components/Profile/ProfileBLL/profile-reducer'
import {Preloader} from '../common/preloader/Preloader';
import {
    selectAppIsLoading,
    selectIsInitialized,
    selectTheme
} from '../store/selectors';
import {AppSnackbar} from '../components/Features/AppSnackbar/AppSnackbar';
import {Scroll} from '../common/scroll/Scroll';
import {useAppSelector} from '../store/store';

export const App = () => {
    const theme = useAppSelector(selectTheme)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoading = useAppSelector(selectAppIsLoading)

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
            <AppSnackbar/>
            {isLoading && <div className={s.appProgress}><Preloader/></div>}
            <Scroll/>
            <AllRoutes/>
        </div>
    )
}