import {CardsTable} from './CardsTable/CardsTable';
import t from '../../common/styles/Themes.module.css';
import s from './Cards.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import React, {useCallback} from 'react';
import {Paginator} from '../Paginator/Paginator';
import {SearchField} from '../SearchField/SearchField';
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from '../../app/AllRoutes';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {addCard, cardsActions, getCards} from '../../bll/cards-reducer';
import {
    selectCardAnswer, selectCardQuestion, selectCardsTotalCount,
    selectPackName, selectPageForCards, selectPageCountForCards, selectTheme, selectIsLoggedIn, selectLoginError
} from '../../selectors/selectors';

export const Cards = () => {
    const theme = useAppSelector(selectTheme)
    const packName = useAppSelector(selectPackName)
    const cardsTotalCount = useAppSelector(selectCardsTotalCount)
    const page = useAppSelector(selectPageForCards)
    const pageCount = useAppSelector(selectPageCountForCards)
    const cardQuestion = useAppSelector(selectCardQuestion)
    const cardAnswer = useAppSelector(selectCardAnswer)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cardsPack_id = useAppSelector(state=> state.cards.params.cardsPack_id)
    const errorCards = useAppSelector(state=> state.cards.errorCards)
    const statusCard = useAppSelector(state=> state.cards.statusCard)
    const error = useAppSelector(selectLoginError)

    const onPageChanged = useCallback((page: number) => {
        dispatch(cardsActions.setCurrentPage(page))
        dispatch(getCards())
    }, [dispatch])

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
    console.log(isLoggedIn)

    return (
        <div className={`${c.container} ${t[theme + '-text']}`}>
            <div className={c.performance}>
                <div className={s.rowElements}>
                    <SuperButton className={s.backIcon}
                                 onClick={() => navigate(PATH.PACKS)}>
                        ←
                    </SuperButton>
                    <div className={c.title}>{packName}</div>
                </div>
                <SuperButton onClick={addNewCard}>Add new card</SuperButton>


                <div className={s.rowElements}>
                    <SearchField onChangeWithDebounce={onChangeDebounceQuestionRequest}
                                 value={cardQuestion}/>
                    <SearchField onChangeWithDebounce={onChangeDebounceAnswerRequest}
                                 value={cardAnswer}/>
                </div>
                <div className={c.table}><CardsTable/></div>
                <div className={s.error}>{errorCards}</div>
                <div>{statusCard}</div>
                <div className={s.error}>{error}</div>

                <div className={c.pagination}>
                    <Paginator onPageChanged={onPageChanged}
                               itemsTotalCount={cardsTotalCount}
                               pageCount={pageCount} page={page}/>
                </div>
            </div>
        </div>
    )
}