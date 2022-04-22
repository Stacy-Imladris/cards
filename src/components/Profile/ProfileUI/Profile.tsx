import s from './Profile.module.css'
import c from '../../../common/styles/Container.module.css'
import t from '../../../common/styles/Themes.module.css'
import profileAva from '../../../assets/images/profile_ava.png'
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton'
import {profileActions} from '../ProfileBLL/profile-reducer'
import {useDispatch} from 'react-redux'
import {EditProfile} from './EditProfile/EditProfile'
import {
    selectPackNameForSearch,
    selectProfileEditMode,
    selectProfileUserName,
    selectTheme, selectUser_id
} from '../../../store/selectors';
import {useCallback, useState} from 'react';
import {SearchField} from '../../Features/SearchField/SearchField';
import {PacksTable} from '../../Packs/PacksUI/PacksTable/PacksTable';
import {packsActions} from '../../Packs/PacksBLL/packs-reducer';
import {DoubleRange} from '../../Features/DoubleRange/DoubleRange';
import {AddPackForm} from '../../Modals/AddPackForm/AddPackForm';
import {useLocation} from 'react-router-dom';
import {useAppSelector} from '../../../store/store';
import {PATH} from '../../../enums/paths';

export const Profile = () => {
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false)

    const name = useAppSelector(selectProfileUserName)
    const theme = useAppSelector(selectTheme)
    const editMode = useAppSelector(selectProfileEditMode)
    const packName = useAppSelector(selectPackNameForSearch)
    const user_id = useAppSelector(selectUser_id)

    const dispatch = useDispatch()
    const location = useLocation()

    const editProfile = useCallback(() => {
        dispatch(profileActions.setEditMode(true))
    }, [dispatch])

    const onChangeDebounceRequest = useCallback((title: string) => {
        dispatch(packsActions.setCurrentPage(1))
        dispatch(packsActions.setTitleForSearch(title))
    }, [dispatch])

    if (editMode) {
        return <EditProfile/>
    }

    const addPackOff = () => {
        setIsAddingOpen(false)
    }

    const addPackOn = () => {
        setIsAddingOpen(true)
    }

    if (location.pathname === PATH.PROFILE) {
        dispatch(packsActions.setPacksForUser(user_id))
        dispatch(packsActions.setPacksType("All"))
    }

    return (
        <div className={c.mainContainer}>
            <AddPackForm onClickNotOpen={addPackOff} isOpen={isAddingOpen}/>
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
                    <DoubleRange/>
                </div>
                <div className={c.performance}>
                    <div className={c.title}>My packs list</div>
                    <div>
                        <div className={c.rowElements}>
                            <SearchField onChangeWithDebounce={onChangeDebounceRequest}
                                         value={packName} wide
                                         placeholder={'Enter pack\'s title for search'}/>
                            <SuperButton className={c.addPack} onClick={addPackOn}>
                                Add pack
                            </SuperButton>
                        </div>
                        <div className={c.table}><PacksTable/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}