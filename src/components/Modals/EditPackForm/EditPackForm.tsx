import {SuperInputText} from 'common/super-components/c1-SuperInputText/SuperInputText';
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import {updatePack} from 'components/Packs/PacksBLL/packs-reducer';
import {memo, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';

type Props = {
  onClickNotOpen: () => void
  isOpen: boolean
  packId: string
  name: string
}
export const EditPackForm = memo(({
                                    onClickNotOpen,
                                    isOpen,
                                    name,
                                    packId
                                  }: Props) => {
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