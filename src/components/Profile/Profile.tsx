import s from './Profile.module.css'
import c from '../../common/styles/Container.module.css'
import t from '../../common/styles/Themes.module.css'
import profileAva from '../../assets/images/profile_ava.png'
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton'
import {profileActions} from './profile-reducer'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../bll/store'
import {EditProfile} from './EditProfile/EditProfile'
import {
    selectLoginError,
    selectPackNameForSearch,
    selectProfileEditMode,
    selectProfileUserName,
    selectTheme, selectUser_id
} from '../../selectors/selectors';
import {useCallback, useEffect} from 'react';
import {SearchField} from '../SearchField/SearchField';
import {PacksTable} from '../Packs/PacksTable/PacksTable';
import {addPack, packsActions} from '../Packs/packs-reducer';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {Notification} from "../../common/notification/Notification";
import {AddNewCardType} from "../../api/packs-api";

export const Profile = () => {
    const name = useAppSelector(selectProfileUserName)
    const theme = useAppSelector(selectTheme)
    const editMode = useAppSelector(selectProfileEditMode)
    const packName = useAppSelector(selectPackNameForSearch)
    const userId = useAppSelector(selectUser_id)
    const error = useAppSelector(selectLoginError)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(packsActions.setPacksForUser(userId))
    })

    const editProfile = useCallback(() => {
        dispatch(profileActions.setEditModeProfile(true))
    }, [dispatch])

    const onChangeDebounceRequest = useCallback((title: string) => {
        dispatch(packsActions.setCurrentPage(1))
        dispatch(packsActions.setTitleForSearch(title))
    }, [dispatch])

    if (editMode) {
        return <EditProfile/>
    }

    const addNewPack = () => {
        dispatch(addPack({} as AddNewCardType))
    }

    return (
        <div className={c.mainContainer}>
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
                            <SuperButton className={c.addPack}  onClick={addNewPack}>Add pack</SuperButton>
                        </div>
                        <div className={c.table}><PacksTable/></div>
                    </div>
                    {error && <Notification text={error}/>}
                </div>
            </div>
        </div>
    )
}