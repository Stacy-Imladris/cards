import {FC, memo, useState} from 'react'
import {SuperButton} from '../../../../../../../common/super-components/c2-SuperButton/SuperButton'
import s from '../../../PacksTable.module.css'
import {DeletePackForm} from '../../../../../../Modals/DeletePackForm/DeletePackForm'
import {EditPackForm} from '../../../../../../Modals/EditPackForm/EditPackForm'
import a from '../../../../../../../common/styles/Actions.module.css'
import {LearnPackForm} from '../../../../../../Modals/LearnPackForm/LearnPackForm';

type PackActionsType = {
    isMyPacks: boolean
    packId: string
    name: string
    cardsCount: number
}

export const PackActions: FC<PackActionsType> = memo(({isMyPacks, packId, name, cardsCount}) => {
    const [isLearningOpen, setIsLearningOpen] = useState<boolean>(false)
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

    const learnPackOff = () => {
        setIsLearningOpen(false)
    }

    const learnPackOn = () => {
        setIsLearningOpen(true)
    }

    return <div className={a.actionButtons}>
        <LearnPackForm onClickNotOpen={learnPackOff} isOpen={isLearningOpen} name={name}
                       onClickLearnPackOn={learnPackOn}/>
        <EditPackForm onClickNotOpen={editPackOff} isOpen={isEditingOpen} packId={packId} name={name}/>
        <DeletePackForm onClickNotOpen={deletePackOff} isOpen={isDeletingOpen} packId={packId} name={name}/>
        {
            cardsCount > 0 &&
            <SuperButton onClick={learnPackOn}>🕮</SuperButton>
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
