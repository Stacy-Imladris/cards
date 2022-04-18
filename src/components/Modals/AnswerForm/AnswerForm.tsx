import {FC, memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {SuperRadio} from '../../../common/super-components/c6-SuperRadio/SuperRadio';
import {Logo} from '../../../common/logo/Logo';
import {useAppSelector} from '../../../bll/store';
import {selectTheme} from '../../../selectors/selectors';
import {CardType} from '../../Cards/CardsAPI/cards-api'
import {estimate} from '../../../bll/learn-reducer'

type AnswerFormPropsType = {
    onClickLearnPackOn: () => void
    onClickNotOpen: () => void
    isOpen: boolean
    name: string
    card: CardType
}

export enum Grades {
    'Did not know' = 1,
    'Forgot' = 2,
    'A lot of thought' = 3,
    'Confused' = 4,
    'Knew the answer' = 5,
}

const arr = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

export const AnswerForm: FC<AnswerFormPropsType> = memo(({
                                                             onClickLearnPackOn,
                                                             onClickNotOpen,
                                                             isOpen,
                                                             name,
                                                             card
                                                         }) => {
    const [value, setValue] = useState<string>('Did not know')
//@ts-ignore
    const grade: number = Grades[value]

    const theme = useAppSelector(selectTheme)

    const dispatch = useDispatch()

    const learnPackOn = useCallback(() => {
        onClickNotOpen()
        onClickLearnPackOn()
        //@ts-ignore
        dispatch(estimate(Grades[value]))
    }, [dispatch, onClickLearnPackOn, onClickNotOpen])

    const onChangeOption = useCallback((value: string) => {
        setValue(value)
    }, [])

    return <Modal onClickNotOpen={onClickNotOpen} width={460} height={530}
                  isOpen={isOpen}
                  backgroundStyle={{background: `${theme === '☀' ? '#d0eca1' : '#022507'}`,
        opacity: 1}}>
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