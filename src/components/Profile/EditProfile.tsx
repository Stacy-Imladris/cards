import React, {useState} from 'react'
import s from './Profile.module.css'
import profile_ava from '../../assets/images/profile_ava.png'
import SuperInputText from '../../common/super-components/c1-SuperInputText/SuperInputText'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../bll/store'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'
import {Navigate} from 'react-router-dom'
import {PATH} from '../../app/AllRoutes'
import {profileActions, updateProfile} from '../../bll/profile-reducer'
import {Preloader} from '../../common/preloader/Preloader'

export const EditProfile = () => {
    const userData = useAppSelector(state => state.profile.user)
    const error = useAppSelector(state => state.profile.error)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const isFetching = useAppSelector(state => state.profile.isFetching)
    const [name, setName] = useState<string>(userData.name)

    const dispatch = useDispatch()

    const navigateToProfile = () => {
        <Navigate to={PATH.PROFILE}/>
        dispatch(profileActions.setEditModeProfileAC(false))
        dispatch(profileActions.setProfileError(''))
    }

    const updateData = () => {
        if (isLoggedIn) {
            dispatch(updateProfile(name, 'https//avatar-url.img'))
        } else {
            <Navigate to={PATH.LOGIN}/>
        }
    }

    const changeNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)

    return (
        <div className={s.editProfilePage}>
            <h3>Personal Data</h3>
            <div className={s.profile__avatar}>
                <img src={profile_ava} alt="avatar"/>
            </div>
            <div>
                <SuperInputText value={name} onChange={changeNameHandle}/>
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
                {isFetching && <Preloader />}
            </div>
        </div>
    )
}