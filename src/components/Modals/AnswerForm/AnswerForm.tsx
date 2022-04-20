import {FC, memo, useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Modal} from '../Modal/Modal'
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton'
import {SuperRadio} from '../../../common/super-components/c6-SuperRadio/SuperRadio'
import {useAppSelector} from '../../../bll/store'
import {selectTheme} from '../../../selectors/selectors'
import {CardType} from '../../Cards/CardsAPI/cards-api'
import {cleanLearnState, rate, setRandomCard} from '../../../bll/learn-reducer'

type AnswerFormPropsType = {
    onClickLearnPackOn: () => void
    onClickNotOpen: () => void
    isOpen: boolean
    name: string
    card: CardType
}

enum GRADES {
    ONE = 'Did not know',
    TWO = 'Forgot',
    THREE = 'A lot of thought',
    FOUR = 'Confused',
    FIVE = 'Knew the answer'
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

    const dispatch = useDispatch()

    const next = useCallback(() => {
        dispatch(setRandomCard())
        onClickNotOpen()
        onClickLearnPackOn()
        setRateEdit(false)
    }, [dispatch, onClickLearnPackOn, onClickNotOpen])

    const estimate = useCallback(() => {
        !rateEdit && dispatch(rate(Grades[value]))
        setRateEdit(true)
    }, [dispatch, value, rateEdit])

    const onChangeOption = useCallback((value: string) => {
        setValue(value as GradesType)
    }, [value])

    const cancel = useCallback(() => {
        dispatch(cleanLearnState())
        onClickNotOpen()
        setRateEdit(false)
    }, [dispatch, onClickNotOpen])

    return <Modal onClickNotOpen={onClickNotOpen} width={460} height={530}
                  isOpen={isOpen}
                  backgroundStyle={{
                      background: `${theme === '☀' ? '#d0eca1' : '#022507'}`,
                      opacity: 1
                  }}>
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
            <SuperButton onClick={cancel}>Cancel</SuperButton>
            <SuperButton onClick={estimate} disabled={rateEdit}>Rate</SuperButton>
            <SuperButton onClick={next}>Next</SuperButton>
        </div>
    </Modal>
})