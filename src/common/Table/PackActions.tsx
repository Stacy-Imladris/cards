import s from './Table.module.css'
import {FC} from 'react'

type PackActionsType = {
    isMyPacks: boolean
    key: string
}

export const PackActions: FC<PackActionsType> = ({isMyPacks, key}) => {

    return <div className={s.packs__actions_buttons} key={key}>
        {isMyPacks
        && <>
            <div>
                <button>Delete</button>
            </div>
            <div>
                <button>Edit</button>
            </div>
        </>
        }
        <div>
            <button>Learn</button>
        </div>
    </div>
}