import {FC, memo, useState} from 'react'
import {getLastUpdatedDate} from '../../../utils/date-helpers'
import {CardType, UpdateCardPayload} from '../../../api/cards-api'
import {useDispatch} from 'react-redux'
import {updateCard} from '../../../bll/cards-reducer'

type CardPropsType = {
    card: CardType
}

export const Card: FC<CardPropsType> = memo(({card}) => {
    const [isEditQuestion, setIsEditQuestion] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>(card.question)
    const [isEditAnswer, setIsEditAnswer] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>(card.answer)

    const lastUpdate = getLastUpdatedDate(card.updated)
    const dispatch = useDispatch()

    const uploadQuestionChanges = () => {
        setIsEditQuestion(false)
        const updatedCard: UpdateCardPayload = {
            card: {
                _id: card._id,
                question
            }
        }
        dispatch(updateCard(updatedCard))
    }

    const uploadAnswerChanges = () => {
        setIsEditAnswer(false)
        const updatedCard: UpdateCardPayload = {
            card: {
                _id: card._id,
                answer
            }
        }
        dispatch(updateCard(updatedCard))
    }

    return <tr>
        {isEditQuestion
            ? <td><input onChange={(e) => setQuestion(e.currentTarget.value)}
                         onBlur={uploadQuestionChanges}
                         value={question}/>
            </td>
            : <td onDoubleClick={() => setIsEditQuestion(true)}>{question}</td>
        }
        {isEditAnswer
            ? <td><input onChange={(e) => setAnswer(e.currentTarget.value)}
                         onBlur={uploadAnswerChanges}
                         value={answer}/>
            </td>
            : <td onDoubleClick={() => setIsEditAnswer(true)}>{answer}</td>
        }
        <td>{lastUpdate}</td>
        <td>{card.grade}</td>
    </tr>
})