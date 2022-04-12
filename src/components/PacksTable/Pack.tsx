import {FC} from 'react'
import {PackActions} from './PackActions'
import {PackType} from '../../api/packs-api'
import {getLastUpdatedDate} from '../../utils/date-helpers'
import {getCards} from '../../bll/cards-reducer'
import {useDispatch} from 'react-redux'

type PackPropsType = {
    pack: PackType
}

export const Pack: FC<PackPropsType> = ({pack}) => {

    const lastUpdate = getLastUpdatedDate(pack.updated)
    const dispatch = useDispatch()

    const loadCards = () => dispatch(getCards({cardsPack_id: pack._id}))

    return <tr>
        <td onClick={loadCards}>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{lastUpdate}</td>
        <td>{pack.user_name}</td>
        <td>
            <PackActions packUserId={pack.user_id}/>
        </td>
    </tr>
}