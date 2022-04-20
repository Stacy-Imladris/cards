import {FC, memo, useCallback, useState} from 'react'
import {Modal} from '../Modal/Modal'
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton'
import {AnswerForm} from '../AnswerForm/AnswerForm'
import {useAppSelector} from '../../../bll/store'
import {selectTheme} from '../../../selectors/selectors'
import {Preloader} from '../../../common/preloader/Preloader'
import {useDispatch} from 'react-redux'
import {cleanLearnState} from '../../../bll/learn-reducer'

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

    const AnswerOff = useCallback(() => {
        setIsAnswerOpen(false)
    }, [])

    const AnswerOn = useCallback(() => {
        onClickNotOpen()
        setIsAnswerOpen(true)
    }, [onClickNotOpen])

    const cancel = useCallback(() => {
        dispatch(cleanLearnState())
        onClickNotOpen()
    }, [onClickNotOpen])


    return <>
        <AnswerForm onClickNotOpen={AnswerOff} isOpen={isAnswerOpen} name={name}
                    card={randomCard}
                    onClickLearnPackOn={onClickLearnPackOn}/>
        <Modal onClickNotOpen={onClickNotOpen} width={460} height={220} isOpen={isOpen}
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
                            <SuperButton onClick={cancel}>Cancel</SuperButton>
                            <SuperButton onClick={AnswerOn}>Show answer</SuperButton>
                        </div>
                    </>
            }
        </Modal>
    </>
})