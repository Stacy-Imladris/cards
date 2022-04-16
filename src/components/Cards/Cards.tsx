import {CardsTable} from './CardsTable/CardsTable'
import t from '../../common/styles/Themes.module.css'
import s from './Cards.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import {useCallback, useState} from 'react';
import {SearchField} from '../SearchField/SearchField';
import {useNavigate, useParams} from 'react-router-dom';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {cardsActions} from './cards-reducer';
import {
    selectCardAnswer,
    selectCardQuestion,
    selectLoginError,
    selectPackName,
    selectTheme,
    selectUser_id
} from '../../selectors/selectors';
import {Notification} from '../../common/notification/Notification';
import {AddCardForm} from '../AddCardForm/AddCardForm';

export const Cards = () => {
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false)

    const theme = useAppSelector(selectTheme)
    const packName = useAppSelector(selectPackName)
    const cardQuestion = useAppSelector(selectCardQuestion)
    const cardAnswer = useAppSelector(selectCardAnswer)
    const cardsPack_id = useAppSelector(state => state.cards.params.cardsPack_id)
    const error = useAppSelector(selectLoginError)
    const userId = useAppSelector(selectUser_id)

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

    const addCardOff = () => {
        setIsAddingOpen(false)
    }

    const addCardOn = () => {
        setIsAddingOpen(true)
    }

    const onBackPage = () => {
        navigate(-1)
        dispatch(cardsActions.setCards([]))
    }

    return (
        <div className={s.cardsContainer}>
            <AddCardForm onClickNotOpen={addCardOff} isOpen={isAddingOpen}
                         cardsPack_id={cardsPack_id}/>
            <div className={`${c.container} ${t[theme + '-text']}`}>
                <div className={s.cardsTable}>
                    <div className={s.backAndTitle}>
                        <SuperButton className={s.backIcon}
                                     onClick={onBackPage}>
                            ←
                        </SuperButton>
                        <div className={c.title}>{packName}</div>
                    </div>
                    <div className={s.rowElements}>
                        <div className={s.searchFields}>
                            <div>
                                <SearchField value={cardQuestion}
                                             placeholder={'Enter question'}
                                             onChangeWithDebounce={onChangeDebounceQuestionRequest}/>
                            </div>
                            <div>
                                <SearchField value={cardAnswer}
                                             placeholder={'Enter answer'}
                                             onChangeWithDebounce={onChangeDebounceAnswerRequest}/>
                            </div>
                        </div>
                        <div>
                            {
                                userId === packUserId &&
                                <SuperButton className={c.addItem} onClick={addCardOn}>
                                  Add card
                                </SuperButton>
                            }
                        </div>
                    </div>
                    <div className={c.table}><CardsTable/></div>
                    {error && <Notification text={error}/>}
                </div>
            </div>
        </div>
    )
}