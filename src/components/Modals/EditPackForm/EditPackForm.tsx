import {FC, memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updatePack} from '../../Packs/PacksBLL/packs-reducer';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {SuperInputText} from '../../../common/super-components/c1-SuperInputText/SuperInputText';

type EditPackFormPropsType = {
    onClickNotOpen: () => void
    isOpen: boolean
    packId: string
    name: string
}
export const EditPackForm: FC<EditPackFormPropsType> = memo(({
                                                                 onClickNotOpen,
                                                                 isOpen,
                                                                 name,
                                                                 packId
                                                             }) => {
    const [newName, setNewName] = useState<string>(name)

    const dispatch = useDispatch()

    const onClickUpdatePack = useCallback(() => {
        dispatch(updatePack(packId, newName, name))
        onClickCleanUpStates()
    }, [dispatch, onClickNotOpen, packId, newName, name])

    const onClickCleanUpStates = () => {
        onClickNotOpen()
        setNewName(name)
    }

    return <Modal onClickNotOpen={onClickCleanUpStates} isOpen={isOpen}>
        <div>Pack name</div>
        <SuperInputText value={newName} placeholder={'Enter new name'}
                        onChangeText={setNewName}/>
        <div>
            <SuperButton onClick={onClickCleanUpStates}>Cancel</SuperButton>
            <SuperButton onClick={onClickUpdatePack}>Save</SuperButton>
        </div>
    </Modal>
})