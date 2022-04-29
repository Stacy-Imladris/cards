import React, {ChangeEvent, FC, useCallback, useRef, useState} from 'react'
import s from '../../../../common/styles/Forms.module.css'
import t from '../../../../common/styles/Themes.module.css'
import {SuperInputText} from '../../../../common/super-components/c1-SuperInputText/SuperInputText'
import {useDispatch} from 'react-redux'
import {SuperButton} from '../../../../common/super-components/c2-SuperButton/SuperButton'
import {profileActions, updateProfile} from '../../ProfileBLL/profile-reducer'
import {Preloader} from '../../../../common/preloader/Preloader'
import {
    selectProfileEditMode,
    selectProfileIsFetching,
    selectProfileUser,
    selectTheme
} from '../../../../store/selectors'
import {Profile} from '../Profile'
import {Logo} from '../../../../common/logo/Logo'
import {useAppSelector} from '../../../../store/store'
import emptyAva from '../../../../assets/images/empty_avatar.png'

type EditProfilePropsType = {
    avatar: string
}

export const EditProfile: FC<EditProfilePropsType> = ({avatar}) => {
    const theme = useAppSelector(selectTheme)
    const userData = useAppSelector(selectProfileUser)
    const isFetching = useAppSelector(selectProfileIsFetching)
    const editMode = useAppSelector(selectProfileEditMode)

    const [name, setName] = useState<string>(userData.name)
    const [imgData, setImgData] = useState<string | ArrayBuffer | null>(avatar);

    const inRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch()

    const navigateToProfile = useCallback(() => {
        dispatch(profileActions.setEditMode(false))
    }, [dispatch])

    const updateData = useCallback(() => {
        dispatch(updateProfile(name, imgData as string))
    }, [dispatch, name, imgData])

    const changeNameHandle = useCallback((value: string) => {
        setName(value)
    }, [])

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0])
        }
    }

    if (!editMode) {
        return <Profile/>
    }

    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <Logo/>
            <div className={s.preloader}>{isFetching && <Preloader/>}</div>
            <div className={s.mainText}>Personal Data</div>
            <div className={s.profile__avatar}>
                <input
                    ref={inRef}
                    type={'file'}
                    style={{display: 'none'}}
                    onChange={upload}
                />
                <img onClick={() => inRef && inRef.current && inRef.current.click()}
                     src={imgData as string ? imgData as string : emptyAva} style={{'cursor': 'pointer', 'width': '100px', 'height': '150'}} alt="avatar"/>

            </div>
            <div><SuperInputText value={name} onChangeText={changeNameHandle}/></div>
            <div><SuperInputText value={userData.email}/></div>
            <div className={s.buttons}>
                <SuperButton onClick={navigateToProfile}>Cancel</SuperButton>
                <SuperButton onClick={updateData}>Save</SuperButton>
            </div>
        </div>
    )
}