import {FC, memo, useCallback, useState} from 'react'
import {SuperButton} from '../../../../../../../common/super-components/c2-SuperButton/SuperButton'
import {DeletePackForm} from '../../../../../../Modals/DeletePackForm/DeletePackForm'
import {EditPackForm} from '../../../../../../Modals/EditPackForm/EditPackForm'
import {LearnPackForm} from '../../../../../../Modals/LearnPackForm/LearnPackForm'
import {useDispatch} from 'react-redux'
import {PackType} from '../../../../../PacksAPI/packs-api'
import {learnCard} from '../../../../../../../store/learnReducer'
import t from '../../../../../../../common/styles/Table.module.css'

type PackActionsType = {
    isMyPacks: boolean
    pack: PackType
}

export const PackActions: FC<PackActionsType> = memo(({isMyPacks, pack}) => {
    const [isLearningOpen, setIsLearningOpen] = useState<boolean>(false)
    const [isDeletingOpen, setIsDeletingOpen] = useState<boolean>(false)
    const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false)

    const dispatch = useDispatch()

    const deletePackOff = useCallback(() => {
        setIsDeletingOpen(false)
    }, [])

    const deletePackOn = useCallback(() => {
        setIsDeletingOpen(true)
    }, [])

    const editPackOff = useCallback(() => {
        setIsEditingOpen(false)
    }, [])

    const editPackOn = useCallback(() => {
        setIsEditingOpen(true)
    }, [])

    const learnPackOff = useCallback(() => {
        setIsLearningOpen(false)
    }, [])

    const learnPackOn = useCallback(() => {
        setIsLearningOpen(true)
    }, [])

    const startLearning = useCallback(() => {
        setIsLearningOpen(true)
        dispatch(learnCard(pack._id))
    }, [])

    return <div className={t.actionButtons}>
        <LearnPackForm onClickNotOpen={learnPackOff} isOpen={isLearningOpen}
                       name={pack.name} onClickLearnPackOn={learnPackOn}/>
        <EditPackForm onClickNotOpen={editPackOff} isOpen={isEditingOpen}
                      packId={pack._id} name={pack.name}/>
        <DeletePackForm onClickNotOpen={deletePackOff} isOpen={isDeletingOpen}
                        packId={pack._id} name={pack.name}/>
        {pack.cardsCount > 0 && <SuperButton onClick={startLearning}>🕮</SuperButton>}
        {isMyPacks && <><SuperButton onClick={editPackOn}>✎</SuperButton>
                <SuperButton red onClick={deletePackOn}>✘</SuperButton></>}
    </div>
})
