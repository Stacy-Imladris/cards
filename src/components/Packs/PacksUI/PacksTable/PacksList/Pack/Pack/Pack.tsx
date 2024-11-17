import {cardsActions} from 'components/Cards/CardsBLL/cards-reducer';
import {PackType} from 'components/Packs/PacksAPI/packs-api'
import {PATH} from 'enums/paths';
import {memo} from 'react'
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {selectUserId} from 'store/selectors';
import {useAppSelector} from 'store/store';
import {getLastUpdatedDate} from 'utils/getLastUpdatedDate';
import {PackActions} from './PackActions'

type Props = {
    pack: PackType
}

export const Pack = memo(({pack}: Props) => {
    const userId = useAppSelector(selectUserId)
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