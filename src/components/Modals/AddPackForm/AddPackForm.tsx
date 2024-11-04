import {memo, useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {addPack} from 'components/Packs/PacksBLL/packs-reducer'
import {Modal} from '../Modal/Modal'
import {SuperInputText} from 'common/super-components/c1-SuperInputText/SuperInputText'
import {SuperCheckbox} from 'common/super-components/c3-SuperCheckbox/SuperCheckbox'
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton'

type Props = {
    onClickNotOpen: () => void
    isOpen: boolean
}

export const AddPackForm = memo(({onClickNotOpen, isOpen}: Props) => {
    const [name, setName] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState(false)

    const dispatch = useDispatch()

    const onClickAddPack = useCallback(() => {
        dispatch(addPack(name, isPrivate))
        onClickCleanUpStates()
    }, [dispatch, onClickNotOpen, name, isPrivate])

    const onClickCleanUpStates = () => {
        onClickNotOpen()
        setName('')
        setIsPrivate(false)
    }

    return <Modal onClickNotOpen={onClickCleanUpStates} isOpen={isOpen}>
        <div>Add new pack</div>
        <SuperInputText value={name} placeholder={'Enter pack name'}
                        onChangeText={setName}/>
        <SuperCheckbox checked={isPrivate} onChangeChecked={setIsPrivate}>
            Make private
        </SuperCheckbox>
        <div>
            <SuperButton onClick={onClickCleanUpStates}>Cancel</SuperButton>
            <SuperButton onClick={onClickAddPack}>Save</SuperButton>
        </div>
    </Modal>
})