import {memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import {SuperInputText} from 'common/super-components/c1-SuperInputText/SuperInputText';
import {updateCard} from 'components/Cards/CardsBLL/cards-reducer';

type Props = {
  onClickNotOpen: () => void
  isOpen: boolean
  cardId: string
  question: string
  answer: string
}

export const EditCardForm = memo(({onClickNotOpen, isOpen, question, answer, cardId}: Props) => {
  const [newQuestion, setNewQuestion] = useState(question)
  const [newAnswer, setNewAnswer] = useState(answer)

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