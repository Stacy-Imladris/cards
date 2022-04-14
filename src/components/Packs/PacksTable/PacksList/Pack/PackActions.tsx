import {FC, memo} from 'react'
import {SuperButton} from '../../../../../common/super-components/c2-SuperButton/SuperButton'
import s from '../../PacksTable.module.css'
import {deletePack, updatePack} from '../../../../../bll/packs-reducer';
import {useDispatch} from 'react-redux';
import {UpdatePackType} from '../../../../../api/packs-api';

type PackActionsType = {
    isMyPacks: boolean
    userId: string
    packId: string
}

export const PackActions: FC<PackActionsType> = memo(({isMyPacks, packId}) => {

    const dispatch = useDispatch()

    const onClickDeletePack = () => {
        dispatch(deletePack(packId))
    }

    const onClickUpdatePack = () => {
        const editingPack: UpdatePackType = {
            cardsPack: {
                _id: packId,
                name: 'NewPackName'
            }
        }
        dispatch(updatePack(editingPack))
    }

    return <div className={s.packsActionsButtons}>
        {
            isMyPacks
            && <>
                <SuperButton red onClick={onClickDeletePack}>Delete</SuperButton>
                <SuperButton
                  onClick={onClickUpdatePack}
                >Edit</SuperButton>
            </>
        }
        <SuperButton>Learn</SuperButton>
    </div>
})
