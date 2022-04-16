import {FC, memo, useState} from 'react'
import {SuperButton} from '../../../../../common/super-components/c2-SuperButton/SuperButton'
import s from '../../PacksTable.module.css'
import {DeletePackForm} from '../../../../DeletePackForm/DeletePackForm';
import {EditPackForm} from '../../../../EditPackForm/EditPackForm';

type PackActionsType = {
    isMyPacks: boolean
    packId: string
    name: string
}

export const PackActions: FC<PackActionsType> = memo(({isMyPacks, packId, name}) => {
    const [isDeletingOpen, setIsDeletingOpen] = useState<boolean>(false)
    const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false)

    const deletePackOff = () => {
        setIsDeletingOpen(false)
    }

    const deletePackOn = () => {
        setIsDeletingOpen(true)
    }

    const editPackOff = () => {
        setIsEditingOpen(false)
    }

    const editPackOn = () => {
        setIsEditingOpen(true)
    }

    return <div className={s.packsActionsButtons}>
        <DeletePackForm onClickNotOpen={deletePackOff} isOpen={isDeletingOpen} packId={packId} name={name}/>
        <EditPackForm onClickNotOpen={editPackOff} isOpen={isEditingOpen} packId={packId} name={name}/>
        {
            isMyPacks &&
            <>
              <SuperButton red onClick={deletePackOn}>Delete</SuperButton>
              <SuperButton onClick={editPackOn}>Edit</SuperButton>
            </>
        }
        <SuperButton>Learn</SuperButton>
    </div>
})


