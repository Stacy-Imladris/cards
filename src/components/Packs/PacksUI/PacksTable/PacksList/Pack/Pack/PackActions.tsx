import {memo, useCallback, useState} from 'react'
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton'
import {DeletePackForm} from 'components/Modals/DeletePackForm/DeletePackForm'
import {EditPackForm} from 'components/Modals/EditPackForm/EditPackForm'
import {LearnPackForm} from 'components/Modals/LearnPackForm/LearnPackForm'
import {useDispatch} from 'react-redux'
import {PackType} from 'components/Packs/PacksAPI/packs-api'
import {learnCard} from 'store/learnReducer'
import t from 'common/styles/Table.module.css'

type PackActionsType = {
    isMyPacks: boolean
    pack: PackType
}

export const PackActions = memo(({isMyPacks, pack}: PackActionsType) => {
    const [isLearningOpen, setIsLearningOpen] = useState(false)
    const [isDeletingOpen, setIsDeletingOpen] = useState(false)
    const [isEditingOpen, setIsEditingOpen] = useState(false)

    const dispatch = useDispatch()

    const deletePackOff = () => setIsDeletingOpen(false)
    const deletePackOn = () => setIsDeletingOpen(true)

    const editPackOff = () => setIsEditingOpen(false)
    const editPackOn = () => setIsEditingOpen(true)

    const learnPackOff = () => setIsLearningOpen(false)
    const learnPackOn = () => setIsLearningOpen(true)

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
