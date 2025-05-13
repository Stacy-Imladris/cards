import {useCallback, useState} from 'react';
import {CardsTable} from './CardsTable/CardsTable'
import t from 'common/styles/Themes.module.css'
import s from './Cards.module.css'
import c from 'common/styles/Container.module.css'
import {SearchField} from 'components/Features/SearchField/SearchField';
import {useNavigate, useParams} from 'react-router-dom';
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {cardsActions} from '../CardsBLL/cards-reducer';
import {
    selectCardAnswer,
    selectCardQuestion, selectPackId,
    selectPackName,
    selectTheme,
    selectUserId
} from 'store/selectors';
import {AddCardForm} from 'components/Modals/AddCardForm/AddCardForm';
import {useAppSelector} from 'store/store';

export const Cards = () => {
    const [isAddingOpen, setIsAddingOpen] = useState(false)

    const theme = useAppSelector(selectTheme)
    const packName = useAppSelector(selectPackName)
    const cardQuestion = useAppSelector(selectCardQuestion)
    const cardAnswer = useAppSelector(selectCardAnswer)
    const cardsPack_id = useAppSelector(selectPackId)
    const userId = useAppSelector(selectUserId)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {packUserId} = useParams<'packUserId'>()

    const onChangeDebounceQuestionRequest = useCallback((title: string) => {
        dispatch(cardsActions.setCurrentPage(1))
        dispatch(cardsActions.setQuestionForSearch(title))
    }, [dispatch])

    const onChangeDebounceAnswerRequest = useCallback((title: string) => {
        dispatch(cardsActions.setCurrentPage(1))
        dispatch(cardsActions.setAnswerForSearch(title))
    }, [dispatch])

    const addCardOff = useCallback(() => setIsAddingOpen(false), [])

    const addCardOn = useCallback(() => setIsAddingOpen(true), [])

    const onBackPage = useCallback(() => navigate(-1), [navigate])

    return (
        <div className={s.cardsContainer}>
            <AddCardForm onClickNotOpen={addCardOff} isOpen={isAddingOpen}
                         cardsPack_id={cardsPack_id}/>
            <div className={`${c.container} ${t[theme + '-text']}`}>
                <div className={s.cardsTable}>
                    <div className={s.backAndTitle}>
                        <SuperButton className={s.backIcon} onClick={onBackPage}>
                            ←
                        </SuperButton>
                        <div className={c.title}>{packName}</div>
                    </div>
                    <div className={s.rowElements}>
                        <div className={s.searchFields}>
                            <div>
                                <SearchField value={cardQuestion}
                                             placeholder="Enter question"
                                             onChangeWithDebounce={onChangeDebounceQuestionRequest}/>
                            </div>
                            <div>
                                <SearchField value={cardAnswer}
                                             placeholder="Enter answer"
                                             onChangeWithDebounce={onChangeDebounceAnswerRequest}/>
                            </div>
                        </div>
                        <div>
                            {userId === packUserId && <SuperButton className={c.addItem} onClick={addCardOn}>Add card</SuperButton>}
                        </div>
                    </div>
                    <div className={c.table}><CardsTable/></div>
                </div>
            </div>
        </div>
    )
}