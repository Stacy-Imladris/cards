import s from './PacksTable.module.css'
import {FC} from 'react'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'
import {updatePack} from '../../bll/packs-reducer'
import {useAppSelector} from '../../bll/store'
import {useDispatch} from 'react-redux'

type PackActionsType = {
    packUserId: string
}

export const PackActions: FC<PackActionsType> = ({packUserId}) => {
    const profileUserId = useAppSelector(state => state.profile.user._id)
    const dispatch = useDispatch()
    const updatePackFun = () => dispatch(updatePack({_id: profileUserId, name: 'New namePack'}))

    return <div className={s.packs__actions_buttons}>
        {
            packUserId !== profileUserId
            && <>
                <SuperButton red>Delete</SuperButton>
                <SuperButton onClick={updatePackFun}>Edit</SuperButton>
            </>
        }
        <SuperButton>Learn</SuperButton>
    </div>
}
