import {FC, memo, useCallback, useState} from 'react'
import {Modal} from '../Modal/Modal'
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton'
import {AnswerForm} from '../AnswerForm/AnswerForm'
import {useAppSelector} from '../../../bll/store'
import {selectTheme} from '../../../selectors/selectors'
import {Preloader} from '../../../common/preloader/Preloader'
import {useDispatch} from 'react-redux'
import {learnActions} from '../../../bll/learn-reducer'
import {CardType} from '../../Cards/CardsAPI/cards-api';

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
    const theme = useAppSelector(selectTheme)
    const isLoading = useAppSelector(state => state.app.isLoading)
    const randomCard = useAppSelector(state => state.learn.randomCard)

    const dispatch = useDispatch()

    const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)

    const setAnswerOff = useCallback(() => {
        setIsAnswerOpen(false)
    }, [])

    const setAnswerOn = useCallback(() => {
        onClickNotOpen()
        setIsAnswerOpen(true)
    }, [onClickNotOpen])

    const onClickStopLearning = useCallback(() => {
        dispatch(learnActions.setRandomCard({} as CardType))
        dispatch(learnActions.setCards([]))
        onClickNotOpen()
    }, [onClickNotOpen])

    return <>
        <AnswerForm onClickNotOpen={setAnswerOff} isOpen={isAnswerOpen} name={name}
                    card={randomCard}
                    onClickLearnPackOn={onClickLearnPackOn}/>
        <Modal onClickNotOpen={onClickStopLearning} width={460} height={220} isOpen={isOpen}
               backgroundStyle={{
                   background: `${theme === '☀' ? '#d0eca1' : '#022507'}`,
                   opacity: 1
               }}>
            {
                isLoading ? <Preloader/> :
                    <>
                        <div>Learn '{name}'</div>
                        <div>Question: '{randomCard.question}'</div>
                        <div>
                            <SuperButton onClick={onClickStopLearning}>Cancel</SuperButton>
                            <SuperButton onClick={setAnswerOn}>Show answer</SuperButton>
                        </div>
                    </>
            }
        </Modal>
    </>
})