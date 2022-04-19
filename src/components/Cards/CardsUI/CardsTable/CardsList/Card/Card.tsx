import {FC, memo, useCallback, useState} from 'react'
import {getLastUpdatedDate} from '../../../../../../utils/date-helpers'
import {CardType} from '../../../../CardsAPI/cards-api'
import s from '../../../Cards.module.css'
import a from '../../../../../../common/styles/Actions.module.css'
import {SuperButton} from '../../../../../../common/super-components/c2-SuperButton/SuperButton'
import {useAppSelector} from '../../../../../../bll/store'
import {selectUser_id} from '../../../../../../selectors/selectors'
import {DeleteCardForm} from '../../../../../Modals/DeleteCardForm/DeleteCardForm'
import {EditCardForm} from '../../../../../Modals/EditCardForm/EditCardForm'
import {useParams} from 'react-router-dom'

type CardPropsType = {
    card: CardType
}

export const Card: FC<CardPropsType> = memo(({card}) => {
    const [isDeletingOpen, setIsDeletingOpen] = useState<boolean>(false)
    const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false)

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
          <div className={a.actionButtons}>
            <SuperButton onClick={editCardOn} className={s.button}>✎</SuperButton>
            <SuperButton red onClick={deleteCardOn} className={s.button}>✘</SuperButton>
          </div>
        </td>}
    </tr>
})