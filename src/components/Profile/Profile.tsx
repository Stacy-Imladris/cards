import s from './Profile.module.css'
import t from '../../common/styles/Themes.module.css';
import profile_ava from '../../assets/images/profile_ava.png'
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton'
import {SuperInputText} from '../../common/super-components/c1-SuperInputText/SuperInputText'
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from "../../app/AllRoutes";
import {profileActions} from '../../bll/profile-reducer';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../bll/store';
import {EditProfile} from './EditProfile/EditProfile';
import {
    selectIsLoggedIn,
    selectProfileEditMode, selectProfileUserName,
    selectTheme
} from '../../selectors/selectors';
import {useCallback} from 'react';

export const Profile = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const name = useAppSelector(selectProfileUserName)
    const theme = useAppSelector(selectTheme)
    const editMode = useAppSelector(selectProfileEditMode)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const editProfile = useCallback(() => {
        dispatch(profileActions.setEditModeProfile(true))
        dispatch(profileActions.setProfileError(''))
    }, [dispatch])

    if (editMode) {
        return <EditProfile/>
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <div className={s.profilePage}>
                <div className={s.profileContent}>
                    <div className={s.profileBlock}>
                        <div className={s.profile__avatar}>
                            <img src={profile_ava} alt={'avatar'}/>
                        </div>
                        <div className={s.profile_name}>{name}</div>
                        <div className={s.profile_job}>Front-end developer</div>
                        <div>
                            <SuperButton onClick={editProfile}>Edit profile</SuperButton>
                        </div>
                    </div>
                    <div className={s.profile_filter}>
                        <h3>Number of cards</h3>
                    </div>
                </div>

                <div className={s.profilePacks}>
                    <h2 onClick={() => navigate(PATH.PACKS)}>PackListAll</h2>
                    <h2>My packs list</h2>
                    <div className={s.profilePacks_search}>
                        <div>
                            <SuperInputText placeholder={'search'}/>
                        </div>
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