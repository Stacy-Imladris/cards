import React from 'react'
import s from './Profile.module.css'
import profile_ava from '../../assets/profile_ava.png'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'
import SuperInputText from '../../common/super-components/c1-SuperInputText/SuperInputText'

export const Profile = () => {
    return (
        <div className={s.profileWrapper}>
            <div className={s.profilePage}>
                <div className={s.profileContent}>
                    <div className={s.profileBlock}>
                        <div className={s.profile_avatar}>
                            <img src={profile_ava} alt={'avatar'}/>
                        </div>
                        <div className={s.profile_name}>Ivanov Ivan</div>
                        <div className={s.profile_job}>Front-end developer</div>
                        <div className={s.profile_edit}>
                            <SuperButton>Edit profile</SuperButton>
                            {/*<button>Edit profile</button>*/}
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
                            {/*<input/>*/}
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