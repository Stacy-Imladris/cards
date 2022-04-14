import {FC, memo} from 'react'
import {PackActions} from './PackActions'
import {useAppSelector} from '../../../bll/store'
import {PackType} from '../../../api/packs-api';
import {getLastUpdatedDate} from '../../../utils/date-helpers'
import {useDispatch} from 'react-redux';
import {cardsActions} from '../../../bll/cards-reducer';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../app/AllRoutes';
import {selectLoginError, selectUser_id} from '../../../selectors/selectors';

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
        navigate(PATH.CARDS)
    }

    return <tr>
        <td onClick={openCard}>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{lastUpdate}</td>
        <td>{pack.user_name}</td>
        <td>
            <PackActions isMyPacks={pack.user_id === userId} userId={userId} packId={pack._id}/>
        </td>
    </tr>
})