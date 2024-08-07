import {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import {deleteCard} from 'components/Cards/CardsBLL/cards-reducer';

type Props = {
    onClickNotOpen: () => void
    isOpen: boolean
    cardId: string
}
export const DeleteCardForm = memo(({onClickNotOpen, isOpen, cardId}: Props) => {
    const dispatch = useDispatch()

    const onClickDeleteCard = useCallback(() => {
        dispatch(deleteCard(cardId))
        onClickNotOpen()
    }, [dispatch, onClickNotOpen, cardId])

    return <Modal onClickNotOpen={onClickNotOpen} isOpen={isOpen}>
        <div>Do you really want to remove card?</div>
        <div>
            <SuperButton onClick={onClickNotOpen}>Cancel</SuperButton>
            <SuperButton onClick={onClickDeleteCard} red>Delete</SuperButton>
        </div>
    </Modal>
})