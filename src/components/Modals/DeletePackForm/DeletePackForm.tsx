import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import {deletePack} from 'components/Packs/PacksBLL/packs-reducer';
import {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';

type Props = {
  onClickNotOpen: () => void
  isOpen: boolean
  packId: string
  name: string
}

export const DeletePackForm = memo(({
                                      onClickNotOpen,
                                      isOpen,
                                      name,
                                      packId
                                    }: Props) => {
  const dispatch = useDispatch()

  const onClickDeletePack = useCallback(() => {
    dispatch(deletePack(packId, name))
    onClickNotOpen()
  }, [dispatch, onClickNotOpen, packId, name])

  return <Modal onClickNotOpen={onClickNotOpen} isOpen={isOpen}>
    <div>Do you really want to remove pack '{name}'?</div>
    <div>All cards will be excluded from this course.</div>
    <div>
      <SuperButton onClick={onClickNotOpen}>Cancel</SuperButton>
      <SuperButton onClick={onClickDeletePack} red>Delete</SuperButton>
    </div>
  </Modal>
})