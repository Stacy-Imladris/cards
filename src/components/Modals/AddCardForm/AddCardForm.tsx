import {memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperInputText} from 'common/super-components/c1-SuperInputText/SuperInputText';
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import {addCard} from 'components/Cards/CardsBLL/cards-reducer';

type Props = {
  onClickNotOpen: () => void
  isOpen: boolean
  cardsPack_id: string
}

export const AddCardForm = memo(({onClickNotOpen, isOpen, cardsPack_id}: Props) => {
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const dispatch = useDispatch()

  const addNewCard = useCallback(() => {
    dispatch(addCard(cardsPack_id, question, answer))
    onClickCleanUpStates()
  }, [dispatch, onClickNotOpen, question, answer])

  const onClickCleanUpStates = () => {
    onClickNotOpen()
    setQuestion('')
    setAnswer('')
  }

  return (
      <Modal onClickNotOpen={onClickCleanUpStates} isOpen={isOpen}>
        <div>Add new card</div>
        <SuperInputText value={question} placeholder={'Enter card question'} onChangeText={setQuestion}/>
        <SuperInputText value={answer} placeholder={'Enter card answer'} onChangeText={setAnswer}/>
        <div>
          <SuperButton onClick={onClickCleanUpStates}>Cancel</SuperButton>
          <SuperButton onClick={addNewCard}>Save</SuperButton>
        </div>
      </Modal>
  )
})