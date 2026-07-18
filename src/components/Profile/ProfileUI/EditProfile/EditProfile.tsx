import {useCallback, useState} from 'react'
import styles from 'common/styles/Forms.module.css'
import extraStyles from 'common/styles/Themes.module.css'
import profile_ava from 'assets/images/profile_ava.png'
import {SuperInputText} from 'common/super-components/c1-SuperInputText/SuperInputText'
import {useDispatch} from 'react-redux'
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton'
import {profileActions, updateProfile} from '../../ProfileBLL/profile-reducer'
import {Preloader} from 'common/preloader/Preloader'
import {
    selectProfileEditMode,
    selectProfileIsFetching,
    selectProfileUser,
    selectTheme
} from 'store/selectors'
import {Profile} from '../Profile'
import {Logo} from 'common/logo/Logo'
import {useAppSelector} from 'store/store';

export const EditProfile = () => {
    const theme = useAppSelector(selectTheme)
    const userData = useAppSelector(selectProfileUser)
    const isFetching = useAppSelector(selectProfileIsFetching)
    const editMode = useAppSelector(selectProfileEditMode)

    const [name, setName] = useState<string>(userData.name)

    const dispatch = useDispatch()

    const navigateToProfile = useCallback(() => {
        dispatch(profileActions.setEditMode(false))
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
        <div className={`${styles.container} ${extraStyles[theme + '-text']}`}>
            <Logo/>
            <div className={styles.preloader}>{isFetching && <Preloader/>}</div>
            <div className={styles.mainText}>Personal Data</div>
            <div className={styles.profile__avatar}><img src={profile_ava} alt="avatar"/></div>
            <div><SuperInputText value={name} onChangeText={changeNameHandle}/></div>
            <div><SuperInputText value={userData.email}/></div>
            <div className={styles.buttons}>
                <SuperButton onClick={navigateToProfile}>Cancel</SuperButton>
                <SuperButton onClick={updateData}>Save</SuperButton>
            </div>
        </div>
    )
}