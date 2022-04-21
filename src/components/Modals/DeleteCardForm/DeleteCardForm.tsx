import {FC, memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {deleteCard} from '../../Cards/CardsBLL/cards-reducer';

type DeleteCardFormPropsType = {
    onClickNotOpen: () => void
    isOpen: boolean
    cardId: string
}
export const DeleteCardForm: FC<DeleteCardFormPropsType> = memo(({
                                                                     onClickNotOpen,
                                                                     isOpen,
                                                                     cardId
                                                                 }) => {
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