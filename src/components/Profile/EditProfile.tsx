import React from 'react'
import s from './Profile.module.css'
import profile_ava from '../../assets/profile_ava.png'
import SuperInputText from '../../common/super-components/c1-SuperInputText/SuperInputText'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../bll/store'
import {UserType} from '../../api/api'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'

export const EditProfile = () => {
    const userData = useSelector<AppRootStateType, UserType>(state => state.profile.user)

    return (
        <div className={s.editProfilePage}>
            <h3>Personal Data</h3>
            <div className={s.profile__avatar}>
                <img src={profile_ava} alt="avatar"/>
            </div>
            <div>
                <SuperInputText value={userData.name}/>
            </div>
            <div>
                <SuperInputText value={userData.email}/>
            </div>
            <div className={s.edit__applyButtons}>
                <div>
                    <SuperButton>Cancel</SuperButton>
                </div>
                 <div>
                    <SuperButton>Save</SuperButton>
                </div>

            </div>
        </div>
    )
}