import {FC, memo} from 'react'
import {getLastUpdatedDate} from '../../../utils/date-helpers'
import {CardType} from '../../../api/cards-api';
import {SuperButton} from "../../../common/super-components/c2-SuperButton/SuperButton";
import s from '../Cards.module.css';
import {useAppSelector} from "../../../bll/store";
import {selectPackUserId, selectUser_id} from "../../../selectors/selectors";
import {deletePack} from "../../../bll/packs-reducer";
import {deleteCard} from "../../../bll/cards-reducer";
import {useDispatch} from "react-redux";

type CardPropsType = {
    card: CardType
    id: string
}

export const Card: FC<CardPropsType> = memo(({card, id}) => {
    const lastUpdate = getLastUpdatedDate(card.updated)
    const userId = useAppSelector(selectUser_id)
    const packUserId = useAppSelector(selectPackUserId)
    const dispatch = useDispatch()

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