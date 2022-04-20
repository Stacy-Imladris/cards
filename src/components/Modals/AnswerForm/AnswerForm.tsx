import {FC, memo, useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Modal} from '../Modal/Modal'
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton'
import {SuperRadio} from '../../../common/super-components/c6-SuperRadio/SuperRadio'
import {AppThunk, useAppSelector} from '../../../bll/store'
import {selectTheme} from '../../../selectors/selectors'
import {CardType} from '../../Cards/CardsAPI/cards-api'
import {learnActions, rate} from '../../../bll/learn-reducer'
import {GRADES} from '../../../enums/grades';
import {Preloader} from '../../../common/preloader/Preloader';
import {getRandomCard} from '../../../utils/getRandomCard';

type AnswerFormPropsType = {
    onClickLearnPackOn: () => void
    onClickNotOpen: () => void
    isOpen: boolean
    name: string
    card: CardType
}

type GradesType = GRADES.ONE | GRADES.TWO | GRADES.THREE | GRADES.FOUR | GRADES.FIVE

type GradesObjectType = {
    [key in GradesType]: number
}

export const Grades: GradesObjectType = {
    [GRADES.ONE]: 1,
    [GRADES.TWO]: 2,
    [GRADES.THREE]: 3,
    [GRADES.FOUR]: 4,
    [GRADES.FIVE]: 5
}

const arr = [GRADES.ONE, GRADES.TWO, GRADES.THREE, GRADES.FOUR, GRADES.FIVE]

export const AnswerForm: FC<AnswerFormPropsType> = memo(({
                                                             onClickLearnPackOn,
                                                             onClickNotOpen,
                                                             isOpen,
                                                             name,
                                                             card
                                                         }) => {
    const [value, setValue] = useState<GradesType>(GRADES.ONE)
    const [rateEdit, setRateEdit] = useState<boolean>(false)

    const theme = useAppSelector(selectTheme)
    const isLoading = useAppSelector(state => state.app.isLoading)
    const cards = useAppSelector(state => state.learn.cards)

    const dispatch = useDispatch()

    const getNextQuestion = useCallback(() => {
        dispatch(learnActions.setRandomCard(getRandomCard(cards)))
        onClickNotOpen()
        onClickLearnPackOn()
        setRateEdit(false)
    }, [dispatch, onClickLearnPackOn, onClickNotOpen])

    const estimate = useCallback(() => {
        dispatch(rate(Grades[value]))
        setRateEdit(true)
    }, [dispatch, value, rateEdit])

    const onChangeOption = useCallback((value: GradesType) => {
        setValue(value)
    }, [value])

    const onClickStopLearning = useCallback(() => {
        onClickNotOpen()
        dispatch(learnActions.setRandomCard({} as CardType))
        dispatch(learnActions.setCards([]))
        setRateEdit(false)
    }, [dispatch, onClickNotOpen])

    return <Modal onClickNotOpen={onClickStopLearning} width={460} height={530}
                  isOpen={isOpen}
                  backgroundStyle={{
                      background: `${theme === '☀' ? '#d0eca1' : '#022507'}`,
                      opacity: 1
                  }}>
        {isLoading ? <Preloader/> :
            <>
                <div>
                    <div>Learn '{name}'</div>
                    <div>Question: '{card.question}'</div>
                    <div>Answer: '{card.answer}'</div>
                </div>
                <div>
                    <div>Rate yourself:</div>
                    <SuperRadio name={'radio'} options={arr}
                                value={value} onChangeOption={onChangeOption}
                    />
                </div>
                <div>
                    <SuperButton onClick={onClickStopLearning}>Cancel</SuperButton>
                    <SuperButton onClick={estimate} disabled={rateEdit}>Rate</SuperButton>
                    <SuperButton onClick={getNextQuestion}>Next</SuperButton>
                </div>
            </>
        }
    </Modal>
})