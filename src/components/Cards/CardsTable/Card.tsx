import {FC, memo} from 'react'
import {getLastUpdatedDate} from '../../../utils/date-helpers'
import {CardType} from '../../../api/cards-api';
import {SuperButton} from "../../../common/super-components/c2-SuperButton/SuperButton";
import s from '../Cards.module.css';
import {useAppSelector} from "../../../bll/store";
import {selectUser_id} from "../../../selectors/selectors";
import {deleteCard} from "../cards-reducer";
import {useDispatch} from "react-redux";
import {useParams} from 'react-router-dom';

type CardPropsType = {
    card: CardType
    id: string
}

export const Card: FC<CardPropsType> = memo(({card, id}) => {
    const lastUpdate = getLastUpdatedDate(card.updated)
    const userId = useAppSelector(selectUser_id)

    const dispatch = useDispatch()
    const {packUserId} = useParams()

    const onClickDeleteCard = () => {
        dispatch(deleteCard(id))
    }

    return <tr>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{lastUpdate}</td>
        <td>{card.grade}</td>
        {userId ===packUserId && <td>
            <div className={s.buttons}>
            <SuperButton>✎</SuperButton>
            <SuperButton red onClick={onClickDeleteCard}>✘</SuperButton>
            </div>
        </td>}
    </tr>
})