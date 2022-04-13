import {useCallback, useEffect, useState} from 'react'
//import s from '../Profile.module.css'
import s from '../../../common/styles/Forms.module.css'
import t from '../../../common/styles/Themes.module.css'
import profile_ava from '../../../assets/images/profile_ava.png'
import {SuperInputText} from '../../../common/super-components/c1-SuperInputText/SuperInputText'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../../bll/store'
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton'
import {profileActions, updateProfile} from '../../../bll/profile-reducer'
import {Preloader} from '../../../common/preloader/Preloader'
import {
    selectProfileEditMode,
    selectProfileError,
    selectProfileIsFetching,
    selectProfileUser, selectTheme
} from '../../../selectors/selectors';
import {Profile} from '../Profile';
import {Logo} from '../../../common/logo/Logo';

export const EditProfile = () => {
    const theme = useAppSelector(selectTheme)
    const userData = useAppSelector(selectProfileUser)
    const error = useAppSelector(selectProfileError)
    const isFetching = useAppSelector(selectProfileIsFetching)
    const editMode = useAppSelector(selectProfileEditMode)

    const [name, setName] = useState<string>(userData.name)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(profileActions.setProfileError(''))
        }
    }, [dispatch])

    const navigateToProfile = useCallback(() => {
        dispatch(profileActions.setEditModeProfile(false))
    }, [dispatch])

    const updateData = useCallback(() => {
        dispatch(updateProfile(name, 'https//avatar-url.img'))
    }, [dispatch, name])

    const changeNameHandle = useCallback((value: string) => {
        setName(value)
    }, [])

    if (!editMode) {
        return <Profile/>
    }

    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <Logo/>
            <div className={s.preloader}>{isFetching && <Preloader/>}</div>
            <div className={s.mainText}>Personal Data</div>
            <div className={s.profile__avatar}><img src={profile_ava} alt="avatar"/></div>
            <div><SuperInputText value={name} onChangeText={changeNameHandle}/></div>
            <div><SuperInputText value={userData.email}/></div>
            <div className={s.error}>{error && error}</div>
            <div className={s.buttons}>
                <SuperButton onClick={navigateToProfile}>Cancel</SuperButton>
                <SuperButton onClick={updateData}>Save</SuperButton>
            </div>
        </div>
    )
}