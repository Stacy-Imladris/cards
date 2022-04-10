import {FC} from 'react'
import SuperButton from '../../../common/super-components/c2-SuperButton/SuperButton'
import s from './PacksTable.module.css'

type PackActionsType = {
    isMyPacks: boolean
}

export const PackActions: FC<PackActionsType> = ({isMyPacks}) => {

    return <div className={s.packsActionsButtons}>
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
