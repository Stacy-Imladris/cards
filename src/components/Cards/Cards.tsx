import {CardsTable} from './CardsTable/CardsTable';
import t from '../../common/styles/Themes.module.css';
import s from './Cards.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import React, {useCallback} from 'react';
import {SearchField} from '../SearchField/SearchField';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../app/AllRoutes';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {cardsActions} from '../../bll/cards-reducer';
import {
    selectCardAnswer,
    selectCardQuestion,
    selectPackName,
    selectTheme
} from '../../selectors/selectors';

export const Cards = () => {
    const theme = useAppSelector(selectTheme)
    const packName = useAppSelector(selectPackName)
    const cardQuestion = useAppSelector(selectCardQuestion)
    const cardAnswer = useAppSelector(selectCardAnswer)

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
                    <div className={s.rowElements}>
                        <div>
                            <SearchField value={cardQuestion}
                                         onChangeWithDebounce={onChangeDebounceQuestionRequest}/>
                        </div>
                        <div>
                            <SearchField value={cardAnswer}
                                         onChangeWithDebounce={onChangeDebounceAnswerRequest}/>
                        </div>
                    </div>
                    <div className={c.table}><CardsTable/></div>
                </div>
            </div>
        </div>
    )
}