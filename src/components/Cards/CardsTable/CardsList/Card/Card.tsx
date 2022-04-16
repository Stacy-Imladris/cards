import {FC, memo, useState} from 'react'
import {getLastUpdatedDate} from '../../../../../utils/date-helpers'
import {CardType, UpdateCardPayload} from '../../../../../api/cards-api';
import c from '../../../../../common/styles/TableLine.module.css'
import s from '../../../Cards.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {deleteCard, updateCard} from '../../../cards-reducer';
import {SuperButton} from '../../../../../common/super-components/c2-SuperButton/SuperButton';
import {AppRootStateType, useAppSelector} from '../../../../../bll/store'
import {selectPackUserId, selectUser_id} from '../../../../../selectors/selectors';
import {useParams} from 'react-router-dom'

type CardPropsType = {
    card: CardType
    cardId: string
}

export const Card: FC<CardPropsType> = memo(({card, cardId}) => {
    const [isEditQuestion, setIsEditQuestion] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>(card.question)
    const [isEditAnswer, setIsEditAnswer] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>(card.answer)

    const lastUpdate = getLastUpdatedDate(card.updated)
    const userId = useAppSelector(selectUser_id)

    const {packUserId} = useParams()
    const dispatch = useDispatch()

    const uploadChanges = (param: 'question' | 'answer') => {
        let updatedCard: UpdateCardPayload
        if(param === 'question') {
            setIsEditQuestion(false)
            updatedCard = { _id: card._id, question: question}
        } else {
            setIsEditAnswer(false)
            updatedCard = { _id: card._id, answer: answer}
        }
        dispatch(updateCard(updatedCard))
    }

    const onClickDeleteCard = () => {
        dispatch(deleteCard(cardId))
    }

    const identityOfUsersId = userId === packUserId

    return <tr>
        {isEditQuestion && identityOfUsersId
            ? <td><input onChange={(e) => {setQuestion(e.currentTarget.value)}}
                         onBlur={() => uploadChanges('question')}
                         value={question}
                         autoFocus
            />
            </td>
            : <td onDoubleClick={() => setIsEditQuestion(true)} className={c.mainColumn}>{question}</td>
        }
        {isEditAnswer && identityOfUsersId
            ? <td><input onChange={(e) => setAnswer(e.currentTarget.value)}
                         onBlur={() => uploadChanges('answer')}
                         value={answer}
                         autoFocus
            />
            </td>
            : <td onDoubleClick={() => setIsEditAnswer(true)} className={c.mainColumn}>{answer}</td>
        }
        <td>{lastUpdate}</td>
        <td>{card.grade}</td>
        {identityOfUsersId && <td className={s.actions}>
          <div className={s.buttons}>
            <SuperButton onClick={() => {
                setQuestion('onClick Question')
                dispatch(updateCard({ _id: card._id, question: 'onClick Question'}))
            }} className={s.button}>✎</SuperButton>
            <SuperButton red onClick={onClickDeleteCard} className={s.button}>✘</SuperButton>
          </div>
        </td>}
    </tr>
})