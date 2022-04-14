import {FC, memo, useState} from 'react'
import {getLastUpdatedDate} from '../../../../../utils/date-helpers'
import {CardType, UpdateCardPayload} from '../../../../../api/cards-api';
import c from '../../../../../common/styles/TableLine.module.css'
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

    const uploadChanges = (title: string, param: 'question' | 'answer') => {
        setIsEditAnswer(false)
        let updatedCard: UpdateCardPayload

        if(param === 'question') {
            updatedCard = {
                card: {
                    _id: card._id,
                    question: title
                }
            }
        } else {
            updatedCard= {
                card: {
                    _id: card._id,
                    answer: title
                }
            }
        }

        dispatch(updateCard(updatedCard))
    }

    return <tr>
        {isEditQuestion
            ? <td><input onChange={(e) => setQuestion(e.currentTarget.value)}
                         onBlur={ () => uploadChanges(question, 'question')}
                         value={question}/>
            </td>
            : <td onDoubleClick={() => setIsEditQuestion(true)} className={c.mainColumn}>{question}</td>
        }
        {isEditAnswer
            ? <td><input onChange={(e) => setAnswer(e.currentTarget.value)}
                         onBlur={() => uploadChanges(question, 'answer')}
                         value={answer}/>
            </td>
            : <td onDoubleClick={() => setIsEditAnswer(true)} className={c.mainColumn}>{answer}</td>
        }
        <td>{lastUpdate}</td>
        <td>{card.grade}</td>
    </tr>
})