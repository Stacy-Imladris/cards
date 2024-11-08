import t from 'common/styles/Table.module.css'
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton'
import {CardType} from 'components/Cards/CardsAPI/cards-api'
import s from 'components/Cards/CardsUI/Cards.module.css'
import {DeleteCardForm} from 'components/Modals/DeleteCardForm/DeleteCardForm'
import {EditCardForm} from 'components/Modals/EditCardForm/EditCardForm'
import {memo, useCallback, useState} from 'react'
import {useParams} from 'react-router-dom'
import {selectUser_id} from 'store/selectors'
import {useAppSelector} from 'store/store';
import {getLastUpdatedDate} from 'utils/getLastUpdatedDate';

type Props = {
    card: CardType
}

export const Card = memo(({card}: Props) => {
    const [isDeletingOpen, setIsDeletingOpen] = useState(false)
    const [isEditingOpen, setIsEditingOpen] = useState(false)

    const userId = useAppSelector(selectUser_id)

    const {packUserId} = useParams<'packUserId'>()

    const deleteCardOff = useCallback(() => {
        setIsDeletingOpen(false)
    }, [])

    const deleteCardOn = useCallback(() => {
        setIsDeletingOpen(true)
    }, [])

    const editCardOff = useCallback(() => {
        setIsEditingOpen(false)
    }, [])

    const editCardOn = useCallback(() => {
        setIsEditingOpen(true)
    }, [])

    const lastUpdate = getLastUpdatedDate(card.updated)

    return <tr>
        <DeleteCardForm onClickNotOpen={deleteCardOff} isOpen={isDeletingOpen} cardId={card._id}/>
        <EditCardForm onClickNotOpen={editCardOff} isOpen={isEditingOpen} cardId={card._id} question={card.question} answer={card.answer}/>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{lastUpdate}</td>
        <td>{card.grade.toFixed(2)}</td>
        {userId === packUserId && <td className={s.actions}>
          <div className={t.actionButtons}>
            <SuperButton onClick={editCardOn}>✎</SuperButton>
            <SuperButton red onClick={deleteCardOn}>✘</SuperButton>
          </div>
        </td>}
    </tr>
})