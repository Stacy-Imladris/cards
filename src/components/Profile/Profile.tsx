import s from './Profile.module.css'
import c from '../../common/styles/Container.module.css';
import t from '../../common/styles/Themes.module.css';
import profileAva from '../../assets/images/profile_ava.png'
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton'
import {Navigate} from 'react-router-dom';
import {PATH} from '../../app/AllRoutes';
import {profileActions} from '../../bll/profile-reducer';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../bll/store';
import {EditProfile} from './EditProfile/EditProfile';
import {
    selectIsLoggedIn,
    selectPackNameForSearch, selectPackUserId,
    selectProfileEditMode,
    selectProfileUserName,
    selectTheme, selectUser_id
} from '../../selectors/selectors';
import {useCallback, useEffect} from 'react';
import {SearchField} from '../SearchField/SearchField';
import {PacksTable} from '../Packs/PacksTable/PacksTable';
import {getPacks, packsActions} from '../../bll/packs-reducer';

export const Profile = () => {
    debugger
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const name = useAppSelector(selectProfileUserName)
    const theme = useAppSelector(selectTheme)
    const editMode = useAppSelector(selectProfileEditMode)
    const packName = useAppSelector(selectPackNameForSearch)
    const dispatch = useDispatch()
    const userId = useAppSelector(selectUser_id)

    useEffect(() => {
        debugger
        dispatch(packsActions.setPacksForUser(userId))
    }, [])


    const editProfile = useCallback(() => {
        dispatch(profileActions.setEditModeProfile(true))
        dispatch(profileActions.setProfileError(''))
    }, [dispatch])

    const onChangeDebounceRequest = useCallback((title: string) => {
        dispatch(packsActions.setCurrentPage(1))
        dispatch(packsActions.setTitleForSearch(title))
    }, [dispatch])

    if (editMode) {
        return <EditProfile/>
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={c.mainContainer}>
            <div className={`${c.container} ${t[theme + '-text']}`}>
                <div className={c.settings}>
                    <div className={s.profile}>
                        <div className={s.profileAvatar}>
                            <img src={profileAva} alt={'avatar'}/>
                        </div>
                        <div className={c.text}>{name}</div>
                        <div className={s.profileJob}>Front-end developer</div>
                        <SuperButton onClick={editProfile} className={s.edit}>
                            Edit profile
                        </SuperButton>
                    </div>
                    <div className={c.text}>Number of cards</div>
                    {/*<DoubleRange/>*/}
                    {/*<div className={c.doubleRange}>
                        <div className={c.num}>{value1Range}</div>
                        <AlternativeSuperDoubleRange value={[value1Range, value2Range]}
                                                     onChangeRange={changeTwoValue}
                                                     min={minCardsCount}
                                                     max={maxCardsCount}/>
                        <div className={c.num}>{value2Range}</div>
                    </div>*/}
                </div>
                <div className={c.performance}>
                    <div className={c.title}>My packs list</div>
                    <div>
                        <div className={c.rowElements}>
                            <SearchField onChangeWithDebounce={onChangeDebounceRequest}
                                         value={packName} wide
                                         placeholder={'Enter pack\'s title for search'}/>
                            <SuperButton className={c.addPack}>Add pack</SuperButton>
                        </div>
                        <div className={c.table}><PacksTable/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
export const DoubleRange = () => {


    return <div className={c.doubleRange}>
        <div className={c.num}>{value1Range}</div>
        <AlternativeSuperDoubleRange value={[value1Range, value2Range]}
                                     onChangeRange={changeTwoValue}
                                     min={minCardsCount}
                                     max={maxCardsCount}/>
        <div className={c.num}>{value2Range}</div>
    </div>
}*/
