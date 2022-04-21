import {FC, memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {SuperInputText} from '../../../common/super-components/c1-SuperInputText/SuperInputText';
import {updateCard} from '../../Cards/CardsBLL/cards-reducer';

type EditCardFormPropsType = {
    onClickNotOpen: () => void
    isOpen: boolean
    cardId: string
    question: string
    answer: string
}
export const EditCardForm: FC<EditCardFormPropsType> = memo(({
                                                                 onClickNotOpen,
                                                                 isOpen, question,
                                                                 answer, cardId
                                                             }) => {
    const [newQuestion, setNewQuestion] = useState<string>(question)
    const [newAnswer, setNewAnswer] = useState<string>(answer)

    const dispatch = useDispatch()

    const onClickUpdateCard = useCallback(() => {
        dispatch(updateCard(cardId, newQuestion, newAnswer))
        onClickCleanUpStates()
    }, [dispatch, onClickNotOpen, cardId, newQuestion, newAnswer])

    const onClickCleanUpStates = () => {
        onClickNotOpen()
        setNewQuestion(question)
        setNewAnswer(answer)
    }

    return <Modal onClickNotOpen={onClickCleanUpStates} isOpen={isOpen}>
        <div>Card info</div>
        <SuperInputText value={newQuestion} placeholder={'Enter new question'}
                        onChangeText={setNewQuestion}/>
        <SuperInputText value={newAnswer} placeholder={'Enter new answer'}
                        onChangeText={setNewAnswer}/>
        <div>
            <SuperButton onClick={onClickCleanUpStates}>Cancel</SuperButton>
            <SuperButton onClick={onClickUpdateCard}>Save</SuperButton>
        </div>
    </Modal>
})