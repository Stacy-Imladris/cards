import {FC, memo, useState} from 'react'
import {getLastUpdatedDate} from '../../../../../utils/date-helpers'
import {CardType} from '../../../../../api/cards-api';
import s from '../../../Cards.module.css'
import {SuperButton} from '../../../../../common/super-components/c2-SuperButton/SuperButton';
import {useAppSelector} from '../../../../../bll/store';
import {selectPackUserId, selectUser_id} from '../../../../../selectors/selectors';
import {DeleteCardForm} from '../../../../DeleteCardForm/DeleteCardForm';
import {EditCardForm} from '../../../../EditCardForm/EditCardForm';

type CardPropsType = {
    card: CardType
}

export const Card: FC<CardPropsType> = memo(({card}) => {
    const [isDeletingOpen, setIsDeletingOpen] = useState<boolean>(false)
    const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false)

    const userId = useAppSelector(selectUser_id)
    const packUserId = useAppSelector(selectPackUserId)

    const deleteCardOff = () => {
        setIsDeletingOpen(false)
    }

    const deleteCardOn = () => {
        setIsDeletingOpen(true)
    }

    const editCardOff = () => {
        setIsEditingOpen(false)
    }

    const editCardOn = () => {
        setIsEditingOpen(true)
    }

    const lastUpdate = getLastUpdatedDate(card.updated)

    return <tr>
        <DeleteCardForm onClickNotOpen={deleteCardOff} isOpen={isDeletingOpen} cardId={card._id}/>
        <EditCardForm onClickNotOpen={editCardOff} isOpen={isEditingOpen} cardId={card._id} question={card.question} answer={card.answer}/>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{lastUpdate}</td>
        <td>{card.grade}</td>
        {userId === packUserId && <td className={s.actions}>
          <div className={s.buttons}>
            <SuperButton onClick={editCardOn} className={s.button}>✎</SuperButton>
            <SuperButton red onClick={deleteCardOn} className={s.button}>✘</SuperButton>
          </div>
        </td>}
    </tr>
})