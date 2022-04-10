import s from './PacksTable.module.css'
import {FC} from 'react'
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton'

type PackActionsType = {
    isMyPacks: boolean
}

export const PackActions: FC<PackActionsType> = ({isMyPacks}) => {

    return <div className={s.packs__actions_buttons}>
        {
            isMyPacks
            && <>
                <SuperButton red>Delete</SuperButton>
                <SuperButton>Edit</SuperButton>
            </>
        }
        <SuperButton>Learn</SuperButton>
    </div>
}
