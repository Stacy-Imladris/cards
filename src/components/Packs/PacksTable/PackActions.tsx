import {FC} from 'react'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'
import {packsActions} from '../../bll/packs-reducer'
import SuperButton from '../../../common/super-components/c2-SuperButton/SuperButton'
import s from './PacksTable.module.css'

type PackActionsType = {
    isMyPacks: boolean
}

export const PackActions: FC<PackActionsType> = ({isMyPacks, profileUserId}) => {

    const updatePack = () => packsActions.updatePack('New namePack', profileUserId)

    return <div className={s.packsActionsButtons}>
        {
            isMyPacks
            && <>
                <SuperButton red>Delete</SuperButton>
                <SuperButton onClick={updatePack}>Edit</SuperButton>
            </>
        }
        <SuperButton>Learn</SuperButton>
    </div>
}
