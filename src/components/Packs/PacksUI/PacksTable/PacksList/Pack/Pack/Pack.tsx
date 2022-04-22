import {FC, memo} from 'react'
import {PackActions} from './PackActions'
import {PackType} from '../../../../../PacksAPI/packs-api'
import {useDispatch} from 'react-redux';
import {cardsActions} from '../../../../../../Cards/CardsBLL/cards-reducer';
import {useNavigate} from 'react-router-dom';
import {selectUser_id} from '../../../../../../../store/selectors';
import {getLastUpdatedDate} from '../../../../../../../utils/getLastUpdatedDate';
import {PATH} from '../../../../../../../enums/paths';
import {useAppSelector} from '../../../../../../../store/store';

type PackPropsType = {
    pack: PackType
}

export const Pack: FC<PackPropsType> = memo(({pack}) => {
    const userId = useAppSelector(selectUser_id)
    const lastUpdate = getLastUpdatedDate(pack.updated)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openCard = () => {
        dispatch(cardsActions.setQuestionForSearch(''))
        dispatch(cardsActions.setAnswerForSearch(''))
        dispatch(cardsActions.setPackName(pack.name))
        dispatch(cardsActions.setPackId(pack._id))
        navigate(`${PATH.CARDS}/${pack.user_id}`)
    }

    return <tr>
        <td onClick={openCard} style={{cursor: 'pointer'}}>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{lastUpdate}</td>
        <td>{pack.user_name}</td>
        <td>
            <PackActions isMyPacks={pack.user_id === userId} pack={pack} />
        </td>
    </tr>
})