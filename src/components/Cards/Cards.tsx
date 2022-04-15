import {CardsTable} from './CardsTable/CardsTable'
import t from '../../common/styles/Themes.module.css'
import s from './Cards.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import {useCallback} from 'react';
import {SearchField} from '../SearchField/SearchField';
import {useNavigate} from 'react-router-dom';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {addCard, cardsActions} from './cards-reducer';
import {
    selectCardAnswer,
    selectCardQuestion, selectLoginError,
    selectPackName, selectPackUserId,
    selectTheme, selectUser_id
} from '../../selectors/selectors';
import {Notification} from "../../common/notification/Notification";


export const Cards = () => {
    const theme = useAppSelector(selectTheme)
    const packName = useAppSelector(selectPackName)
    const cardQuestion = useAppSelector(selectCardQuestion)
    const cardAnswer = useAppSelector(selectCardAnswer)
    const cardsPack_id = useAppSelector(state=> state.cards.params.cardsPack_id)
    const errorCards = useAppSelector(state=> state.cards.errorCards)
    const statusCard = useAppSelector(state=> state.cards.statusCard)
    const error = useAppSelector(selectLoginError)
    const userId = useAppSelector(selectUser_id)
    const packUserId = useAppSelector(selectPackUserId)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChangeDebounceQuestionRequest = useCallback((title: string) => {
        dispatch(cardsActions.setCurrentPage(1))
        dispatch(cardsActions.setQuestionForSearch(title))
    }, [dispatch])

    const onChangeDebounceAnswerRequest = useCallback((title: string) => {
        dispatch(cardsActions.setCurrentPage(1))
        dispatch(cardsActions.setAnswerForSearch(title))
    }, [dispatch])

    const addNewCard = () => {
        dispatch(addCard({cardsPack_id: cardsPack_id}))
    }

    return (
        <div className={s.cardsContainer}>
            <div className={`${c.container} ${t[theme + '-text']}`}>
                <div className={s.cardsTable}>
                    <div className={s.backAndTitle}>
                        <SuperButton className={s.backIcon}
                                     onClick={() => navigate(-1)}>
                            ←
                        </SuperButton>
                        <div className={c.title}>{packName}</div>
                    </div>
                    <div className={s.rowElements}>
                        <div>
                            <SearchField value={cardQuestion} placeholder={'Enter question'}
                                         onChangeWithDebounce={onChangeDebounceQuestionRequest}/>
                        </div>
                        <div>
                            <SearchField value={cardAnswer} placeholder={'Enter answer'}
                                         onChangeWithDebounce={onChangeDebounceAnswerRequest}/>
                        </div>
                        {userId === packUserId && <SuperButton className={c.addItem} onClick={addNewCard}>Add card</SuperButton>}
                    </div>
                    <div className={c.table}><CardsTable/></div>
                    {errorCards&&<Notification text={errorCards}/>}
                    {error&&<Notification text={error}/>}
                    {statusCard&&<Notification text={statusCard}/>}
                </div>
            </div>
        </div>
    )
}