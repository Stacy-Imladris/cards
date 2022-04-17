import {FC, memo, useCallback, useState} from 'react';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {AnswerForm} from '../AnswerForm/AnswerForm';

type LearnPackFormPropsType = {
    onClickLearnPackOn: () => void
    onClickNotOpen: () => void
    isOpen: boolean
    name: string
}
export const LearnPackForm: FC<LearnPackFormPropsType> = memo(({
                                                                   onClickLearnPackOn,
                                                                   onClickNotOpen,
                                                                   isOpen,
                                                                   name
                                                               }) => {
    const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)

    const AnswerOff = useCallback(() => {
        setIsAnswerOpen(false)
    }, [])

    const AnswerOn = useCallback(() => {
        onClickNotOpen()
        setIsAnswerOpen(true)
    }, [onClickNotOpen])

    return <>
        <AnswerForm onClickNotOpen={AnswerOff} isOpen={isAnswerOpen} name={name}
                    onClickLearnPackOn={onClickLearnPackOn}/>
        <Modal onClickNotOpen={onClickNotOpen} width={460} height={220} isOpen={isOpen}>
            <div>Learn '{name}'</div>
            <div>Question: '{}'</div>
            <div>
                <SuperButton onClick={onClickNotOpen}>Cancel</SuperButton>
                <SuperButton onClick={AnswerOn}>Show answer</SuperButton>
            </div>
        </Modal>
    </>
})