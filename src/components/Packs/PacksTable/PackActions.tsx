import {FC, memo} from 'react'
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton'
import s from './PacksTable.module.css'
import {deletePack, packsActions} from '../../../bll/packs-reducer';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../bll/store";

type PackActionsType = {
    isMyPacks: boolean
    userId: string
    packId: string
}

export const PackActions: FC<PackActionsType> = memo(({isMyPacks, userId, packId}) => {

    const dispatch = useDispatch()

    const onClickDeletePack = () => {
        dispatch(deletePack(packId))
    }

    return <div className={s.packsActionsButtons}>
        {
            isMyPacks
            && <>
                <SuperButton red onClick={onClickDeletePack}>Delete</SuperButton>
                <SuperButton
                    // onClick={updatePack}
                >Edit</SuperButton>
            </>
        }
        <SuperButton>Learn</SuperButton>
    </div>
})