import {useCallback, useEffect, useState} from 'react'
import s from './Profile.module.css'
import profile_ava from '../../assets/images/profile_ava.png'
import {SuperInputText} from '../../common/super-components/c1-SuperInputText/SuperInputText'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../bll/store'
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton'
import {profileActions, updateProfile} from '../../bll/profile-reducer'
import {Preloader} from '../../common/preloader/Preloader'
import {
    selectProfileEditMode,
    selectProfileError,
    selectProfileIsFetching,
    selectProfileUser
} from '../../selectors/selectors';
import {Profile} from './Profile';

export const EditProfile = () => {
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
        <div className={s.editProfilePage}>
            <h3>Personal Data</h3>
            <div className={s.profile__avatar}>
                <img src={profile_ava} alt="avatar"/>
            </div>
            <div>
                <SuperInputText value={name} onChangeText={changeNameHandle}/>
            </div>
            <div>
                <SuperInputText value={userData.email}/>
            </div>
            <div className={s.profileError}>
                {error && error}
            </div>
            <div className={s.edit__applyButtons}>
                <div>
                    <SuperButton onClick={navigateToProfile}>Cancel</SuperButton>
                </div>
                <div>
                    <SuperButton onClick={updateData}>Save</SuperButton>
                </div>
            </div>
            <div>
                {isFetching && <Preloader/>}
            </div>
        </div>
    )
}