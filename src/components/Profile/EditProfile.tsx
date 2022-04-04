import React, {useState} from 'react'
import s from './Profile.module.css'
import profile_ava from '../../assets/profile_ava.png'
import SuperInputText from '../../common/super-components/c1-SuperInputText/SuperInputText'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../bll/store'
import {UserType} from '../../api/api'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'
import {Navigate} from 'react-router-dom'
import {PATH} from '../../app/AllRoutes'
import {profileActions, updateProfile} from '../../bll/profileReducer'

export const EditProfile = () => {
    const userData = useSelector<AppRootStateType, UserType>(state => state.profile.user)
    const [name, setName] = useState<string>(userData.name)
    const isAuthorized = true // this data will be taken from loginProfile via useSelector

    const dispatch = useDispatch()

    const navigateToProfile = () => {
        <Navigate to={PATH.PROFILE}/>
        dispatch(profileActions.setEditModeProfileAC(false))
    }

    const updateData = () => {
        if (isAuthorized) {
            dispatch(updateProfile(name, 'https//avatar-url.img'))
        } else {
            <Navigate to={PATH.LOGIN}/>
        }
        dispatch(profileActions.setEditModeProfileAC(false))
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
            <div className={s.edit__applyButtons}>
                <div>
                    <SuperButton onClick={navigateToProfile}>Cancel</SuperButton>
                </div>
                <div>
                    <SuperButton onClick={updateData}>Save</SuperButton>
                </div>

            </div>
        </div>
    )
}