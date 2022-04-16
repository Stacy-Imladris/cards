import {FC, memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPack} from '../Packs/packs-reducer';
import {Modal} from '../Modal/Modal';
import {SuperInputText} from '../../common/super-components/c1-SuperInputText/SuperInputText';
import {SuperCheckbox} from '../../common/super-components/c3-SuperCheckbox/SuperCheckbox';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';

type AddPackFormPropsType = {
    onClickNotOpen: () => void
    isOpen: boolean
}
export const AddPackForm: FC<AddPackFormPropsType> = memo(({onClickNotOpen, isOpen}) => {
    const [name, setName] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    const dispatch = useDispatch()

    const onClickAddPack = useCallback(() => {
        dispatch(addPack(name, isPrivate))
        onClickNotOpen()
        setName('')
        setIsPrivate(false)
    }, [dispatch, onClickNotOpen, name, isPrivate])

    return <Modal onClickNotOpen={onClickNotOpen} width={400} height={300}
                  isOpen={isOpen}>
        <div>Add new pack</div>
        <SuperInputText value={name} placeholder={'Enter pack name'}
                        onChangeText={setName}/>
        <SuperCheckbox checked={isPrivate} onChangeChecked={setIsPrivate}>
            Make private
        </SuperCheckbox>
        <SuperButton onClick={onClickNotOpen}>Cancel</SuperButton>
        <SuperButton onClick={onClickAddPack}>Save</SuperButton>
    </Modal>
})