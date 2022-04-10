import {FC} from 'react'
import SuperButton from '../../../common/super-components/c2-SuperButton/SuperButton'
import s from './PacksTable.module.css'
import {packsActions} from '../../../bll/packs-reducer';

type PackActionsType = {
    isMyPacks: boolean
    userId: string
}

export const PackActions: FC<PackActionsType> = ({isMyPacks, userId}) => {

    //const updatePack = () => packsActions.updatePack('New namePack', userId)

    return <div className={s.packsActionsButtons}>
        {
            isMyPacks
            && <>
                <SuperButton red>Delete</SuperButton>
                <SuperButton
                  //onClick={updatePack}
                >Edit</SuperButton>
            </>
        }
        <SuperButton>Learn</SuperButton>
    </div>
}
