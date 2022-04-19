import {FC, memo, useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Modal} from '../Modal/Modal'
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton'
import {SuperRadio} from '../../../common/super-components/c6-SuperRadio/SuperRadio'
import {useAppSelector} from '../../../bll/store'
import {selectTheme} from '../../../selectors/selectors'
import {CardType} from '../../Cards/CardsAPI/cards-api'
import {rate} from '../../../bll/learn-reducer'

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
    [GRADES.FIVE]: 5,
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

    const theme = useAppSelector(selectTheme)

    const dispatch = useDispatch()

    const learnPackOn = useCallback(() => {
        onClickNotOpen()
        onClickLearnPackOn()
        dispatch(rate(Grades[value]))
    }, [dispatch, onClickLearnPackOn, onClickNotOpen, value])

    const onChangeOption = useCallback((value: string) => {
        setValue(value as GradesType)
    }, [])

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
            <SuperButton onClick={onClickNotOpen}>Cancel</SuperButton>
            <SuperButton onClick={learnPackOn}>Next</SuperButton>
        </div>
    </Modal>
})