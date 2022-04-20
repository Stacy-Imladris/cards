import {FC, memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {SuperRadio} from '../../../common/super-components/c6-SuperRadio/SuperRadio';
import {useAppSelector} from '../../../bll/store';
import {selectTheme} from '../../../selectors/selectors';
import {CardType} from '../../Cards/CardsAPI/cards-api';

type AnswerFormPropsType = {
    onClickLearnPackOn: () => void
    onClickNotOpen: () => void
    isOpen: boolean
    name: string
}

const arr = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

export const AnswerForm: FC<AnswerFormPropsType> = memo(({
                                                             onClickLearnPackOn,
                                                             onClickNotOpen,
                                                             isOpen,
                                                             name
                                                         }) => {
    const [value, setValue] = useState<string>('Did not know')
    //const [card, setCard] = useState<CardType>({} as CardType)

    const theme = useAppSelector(selectTheme)

    const dispatch = useDispatch()

    const learnPackOn = useCallback(() => {
        onClickNotOpen()
        onClickLearnPackOn()
        //dispatch(rate(Grades[value]))
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
            <div>Question: '{}'</div>
            <div>Answer: '{}'</div>
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