import {FC} from 'react'
import {PackActions} from './PackActions'
import {PackType} from '../../api/packs-api'
import {getLastUpdatedDate} from '../../utils/date-helpers'

type PackPropsType = {
    pack: PackType
}

export const Pack: FC<PackPropsType> = ({pack}) => {

    const lastUpdate = getLastUpdatedDate(pack.updated)

    return <tr>
        <td>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{lastUpdate}</td>
        <td>{pack.user_name}</td>
        <td>
            <PackActions packUserId={pack.user_id}/>
        </td>
    </tr>
}