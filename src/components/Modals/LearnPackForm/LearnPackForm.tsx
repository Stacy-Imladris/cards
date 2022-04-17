import {FC, memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';

type LearnPackFormPropsType = {
    onClickNotOpen: () => void
    isOpen: boolean
}
export const LearnPackForm: FC<LearnPackFormPropsType> = memo(({onClickNotOpen, isOpen}) => {
    const dispatch = useDispatch()

    const onClickDeletePack = useCallback(() => {
        //dispatch(deletePack(packId, name))
        onClickNotOpen()
    }, [dispatch, onClickNotOpen])

    return <Modal onClickNotOpen={onClickNotOpen} width={460} height={220}
                  isOpen={isOpen}>
        <div>Learn '{name}'</div>
        <div>Question: '{question}'</div>
        <div>
            <SuperButton onClick={onClickNotOpen}>Cancel</SuperButton>
            <SuperButton onClick={ffffff} red>Show answer</SuperButton>
        </div>
    </Modal>
})