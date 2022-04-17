import {FC, memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {SuperRadio} from '../../../common/super-components/c6-SuperRadio/SuperRadio';

type AnswerFormPropsType = {
    onClickLearnPackOn: () => void
    onClickNotOpen: () => void
    isOpen: boolean
    name: string
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
                                                             name
                                                         }) => {
    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        //dispatch()
        onClickNotOpen()
    }, [dispatch, onClickNotOpen])

    const [value, setValue] = useState<string>('Did not know')

    const onChangeOption = useCallback((value: string) => {
        setValue(value)
        //dispatch(rate(Grades[value]))
    }, [dispatch])

    const learnPackOn = () => {
        onClickNotOpen()
        onClickLearnPackOn()
    }

    return <Modal onClickNotOpen={onClickNotOpen} width={460} height={420}
                  isOpen={isOpen}>
        <div>Learn '{name}'</div>
        <div>Question: '{}'</div>
        <div>Answer: '{}'</div>
        <div>Rate yourself:</div>
        <SuperRadio name={'radio'} options={arr}
                    value={value} onChangeOption={onChangeOption}
        />
        <div>
            <SuperButton onClick={onClickNotOpen}>Cancel</SuperButton>
            <SuperButton onClick={learnPackOn}>Next</SuperButton>
        </div>
    </Modal>
})