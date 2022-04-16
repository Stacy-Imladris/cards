import {FC, memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updatePack} from '../Packs/packs-reducer';
import {Modal} from '../Modal/Modal';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {SuperInputText} from '../../common/super-components/c1-SuperInputText/SuperInputText';

type EditPackFormPropsType = {
    onClickNotOpen: () => void
    isOpen: boolean
    packId: string
    name: string
}
export const EditPackForm: FC<EditPackFormPropsType> = memo(({onClickNotOpen, isOpen, name, packId}) => {
    const [newName, setNewName] = useState<string>(name)

    const dispatch = useDispatch()

    const onClickUpdatePack = useCallback(() => {
        dispatch(updatePack(packId, newName, name))
        onClickNotOpen()
        setNewName('')
    }, [dispatch, onClickNotOpen, packId, newName, name])

    return <Modal onClickNotOpen={onClickNotOpen} width={400} height={300}
                  isOpen={isOpen}>
        <div>Pack name</div>
        <SuperInputText value={newName} placeholder={'Enter new name'}
                        onChangeText={setNewName}/>
        <SuperButton onClick={onClickNotOpen}>Cancel</SuperButton>
        <SuperButton onClick={onClickUpdatePack}>Save</SuperButton>
    </Modal>
})