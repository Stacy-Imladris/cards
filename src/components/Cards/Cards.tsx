import {CardsTable} from './CardsTable/CardsTable';
import t from '../../common/styles/Themes.module.css';
import s from './Cards.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import React, {useCallback} from 'react';
import {SearchField} from '../SearchField/SearchField';
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from '../../app/AllRoutes';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {addCard, cardsActions} from '../../bll/cards-reducer';
import {
    selectCardAnswer,
    selectCardQuestion, selectIsLoggedIn, selectLoginError,
    selectPackName,
    selectTheme
} from '../../selectors/selectors';


export const Cards = () => {
    const theme = useAppSelector(selectTheme)
    const packName = useAppSelector(selectPackName)
    const cardQuestion = useAppSelector(selectCardQuestion)
    const cardAnswer = useAppSelector(selectCardAnswer)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cardsPack_id = useAppSelector(state=> state.cards.params.cardsPack_id)
    const errorCards = useAppSelector(state=> state.cards.errorCards)
    const statusCard = useAppSelector(state=> state.cards.statusCard)
    const error = useAppSelector(selectLoginError)

    const onChangeDebounceQuestionRequest = useCallback((title: string) => {
        dispatch(cardsActions.setCurrentPage(1))
        dispatch(cardsActions.setQuestionForSearch(title))
    }, [dispatch])

    const onChangeDebounceAnswerRequest = useCallback((title: string) => {
        dispatch(cardsActions.setCurrentPage(1))
        dispatch(cardsActions.setAnswerForSearch(title))
    }, [dispatch])


    const card = {
        cardsPack_id: cardsPack_id,
        question: "no question",
        answer: "no answer",
        grade: 0,
        shots: 0,
        answerImg: "url or base 64",
        questionImg: "url or base 64",
        questionVideo: "url or base 64",
        answerVideo: "url or base 64",
    }

    const addNewCard = () => {
        dispatch(addCard(card))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.cardsContainer}>
            <div className={`${c.container} ${t[theme + '-text']}`}>
                <div className={s.cardsTable}>
                    <div className={s.backAndTitle}>
                        <SuperButton className={s.backIcon}
                                     onClick={() => navigate(PATH.PACKS)}>
                            ←
                        </SuperButton>
                        <div className={c.title}>{packName}</div>
                    </div>
                    <SuperButton onClick={addNewCard}>Add new card</SuperButton>
                    <div className={s.rowElements}>
                        <div>
                            <SearchField value={cardQuestion} placeholder={'Enter question'}
                                         onChangeWithDebounce={onChangeDebounceQuestionRequest}/>
                        </div>
                        <div>
                            <SearchField value={cardAnswer} placeholder={'Enter answer'}
                                         onChangeWithDebounce={onChangeDebounceAnswerRequest}/>
                        </div>
                    </div>
                    <div className={c.table}><CardsTable/></div>
                    <div className={s.error}>{errorCards}</div>
                    <div>{statusCard}</div>
                    <div className={s.error}>{error}</div>
                </div>
            </div>
        </div>
    )
}