import s from './Table.module.css'
import {FC} from 'react'
import SuperButton from '../super-components/c2-SuperButton/SuperButton'

type PackActionsType = {
    isMyPacks: boolean
    key: string
}

export const PackActions: FC<PackActionsType> = ({isMyPacks, key}) => {

    return <div className={s.packs__actions_buttons} key={key}>
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
