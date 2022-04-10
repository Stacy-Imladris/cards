import s from './PacksTable.module.css'
import {FC} from 'react'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'
import {packsActions} from '../../bll/packs-reducer'

type PackActionsType = {
    isMyPacks: boolean
    profileUserId: string
}

export const PackActions: FC<PackActionsType> = ({isMyPacks, profileUserId}) => {

    const updatePack = () => packsActions.updatePack('New namePack', profileUserId)

    return <div className={s.packs__actions_buttons}>
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
