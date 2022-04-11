import {CardsTable} from './CardsTable/CardsTable';
import t from '../../common/styles/Themes.module.css';
import s from './Cards.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import React, {useCallback} from 'react';
import {Paginator} from '../Paginator/Paginator';
import {SearchField} from '../SearchField/SearchField';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../app/AllRoutes';
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {cardsActions, getCards} from '../../bll/cards-reducer';

export const Cards = () => {
    const theme = useAppSelector(state => state.theme.theme)
    const packName = useAppSelector(state => state.cards.packName)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion)
    const cardAnswer = useAppSelector(state => state.cards.params.cardAnswer)

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                <div className={s.rowElements}>
                    <SearchField onChangeWithDebounce={onChangeDebounceQuestionRequest}
                                 value={cardQuestion}/>
                    <SearchField onChangeWithDebounce={onChangeDebounceAnswerRequest}
                                 value={cardAnswer}/>
                </div>
                <div className={c.table}><CardsTable/></div>
                <div className={c.pagination}>
                    <Paginator onPageChanged={onPageChanged}
                               itemsTotalCount={cardsTotalCount}
                               pageCount={pageCount} page={page}/>
                </div>
            </div>
        </div>
    )
}