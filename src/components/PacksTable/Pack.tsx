import {FC} from 'react'
import {PackActions} from './PackActions'
import {useAppSelector} from '../../bll/store'
import {PackType} from '../../api/packs-api';
import {getLastUpdatedDate} from '../../utils/date-helpers'

type PackPropsType = {
    pack: PackType
}

export const Pack: FC<PackPropsType> = ({pack}) => {
    const userId = useAppSelector(state => state.profile.user._id)
    const lastUpdate = getLastUpdatedDate(pack.updated)

    return <tr>
        <td>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{lastUpdate}</td>
        <td>{pack.user_name}</td>
        <td>
            <PackActions key={pack._id} isMyPacks={pack.user_id === userId}/>
            {/*<PackActions key={pack._id} isMyPacks={true}/>*/}
        </td>
    </tr>
}