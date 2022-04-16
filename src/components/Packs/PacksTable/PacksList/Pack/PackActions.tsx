import {FC, memo, useState} from 'react'
import {SuperButton} from '../../../../../common/super-components/c2-SuperButton/SuperButton'
import s from '../../PacksTable.module.css'
import {DeletePackForm} from '../../../../Modals/DeletePackForm/DeletePackForm'
import {EditPackForm} from '../../../../Modals/EditPackForm/EditPackForm'
import a from '../../../../../common/styles/Actions.module.css'

type PackActionsType = {
    isMyPacks: boolean
    packId: string
    name: string
    cardsCount: number
}

export const PackActions: FC<PackActionsType> = memo(({isMyPacks, packId, name, cardsCount}) => {
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

    return <div className={a.actionButtons}>
        <DeletePackForm onClickNotOpen={deletePackOff} isOpen={isDeletingOpen} packId={packId} name={name}/>
        <EditPackForm onClickNotOpen={editPackOff} isOpen={isEditingOpen} packId={packId} name={name}/>
        {
            cardsCount > 0
            && <SuperButton>🕮</SuperButton>
        }
        {
            isMyPacks &&
            <>
              <SuperButton onClick={editPackOn} className={s.button}>✎</SuperButton>
              <SuperButton red onClick={deletePackOn} className={s.button}>✘</SuperButton>
            </>
        }
    </div>
})
