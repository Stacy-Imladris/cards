import React from 'react'
import s from './Profile.module.css'
import profile_ava from '../../assets/images/profile_ava.png'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'
import SuperInputText from '../../common/super-components/c1-SuperInputText/SuperInputText'
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/AllRoutes";
import {profileActions} from '../../bll/profile-reducer';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../bll/store';
import {EditProfile} from './EditProfile';

export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const name = useAppSelector(state => state.profile.user.name)
    const editMode = useAppSelector(state => state.profile.editMode)
    const dispatch = useDispatch()
    const editProfile = () => dispatch(profileActions.setEditModeProfileAC(true))

    if (editMode) {
        return <EditProfile/>
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profileWrapper}>
            <div className={s.profilePage}>
                <div className={s.profileContent}>
                    <div className={s.profileBlock}>
                        <div className={s.profile__avatar}>
                            <img src={profile_ava} alt={'avatar'}/>
                        </div>
                        <div className={s.profile_name}>{name}</div>
                        <div className={s.profile_job}>Front-end developer</div>
                        <div className={s.profile_edit}>
                            <SuperButton onClick={editProfile}>Edit profile</SuperButton>
                        </div>
                    </div>
                    <div className={s.profile_filter}>
                        <h3>Number of cards</h3>
                    </div>
                </div>

                <div className={s.profilePacks}>
                    profilePacks
                    <h1>My packs list</h1>
                    <div className={s.profilePacks_search}>
                        profilePacks_search
                        <div>
                            <SuperInputText placeholder={'search'}/>
                        </div>
                    </div>
                    <div className={s.profilePacks_packsTable}>
                        profilePacks_packsTable
                    </div>
                    <div className={s.profilePacks_pagination}>
                        profilePacks_pagination
                        <div>1 2 3 4...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}